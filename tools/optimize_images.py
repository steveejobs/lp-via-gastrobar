#!/usr/bin/env python3
"""Otimiza imagens sem sobrescrever os originais.

Exemplos:
  python tools/optimize_images.py public/media --report
  python tools/optimize_images.py public/media --write --format webp
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageOps


SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}


@dataclass(frozen=True)
class Candidate:
    source: Path
    width: int
    height: int
    bytes: int


def discover(root: Path) -> Iterable[Candidate]:
    for source in sorted(root.rglob("*")):
        if not source.is_file() or source.suffix.lower() not in SUPPORTED:
            continue
        with Image.open(source) as image:
            width, height = image.size
        yield Candidate(source, width, height, source.stat().st_size)


def output_path(source: Path, root: Path, output: Path, image_format: str) -> Path:
    relative = source.relative_to(root)
    return (output / relative).with_suffix(f".{image_format}")


def optimize(
    candidate: Candidate,
    destination: Path,
    max_width: int,
    quality: int,
    image_format: str,
) -> int:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(candidate.source) as original:
        image = ImageOps.exif_transpose(original)
        if image.width > max_width:
            target_height = round(image.height * max_width / image.width)
            image = image.resize((max_width, target_height), Image.Resampling.LANCZOS)

        if image_format in {"jpg", "webp"} and image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGB")
        if image_format == "jpg" and image.mode == "RGBA":
            background = Image.new("RGB", image.size, "white")
            background.paste(image, mask=image.getchannel("A"))
            image = background

        save_format = "JPEG" if image_format == "jpg" else image_format.upper()
        options = {"format": save_format, "quality": quality, "optimize": True}
        if image_format == "webp":
            options["method"] = 6
        image.save(destination, **options)
    return destination.stat().st_size


def format_size(value: int) -> str:
    return f"{value / 1024:.1f} KiB"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Inspeciona e otimiza imagens preservando os arquivos originais.",
    )
    parser.add_argument(
        "root",
        nargs="?",
        type=Path,
        default=Path("public/media"),
        help="pasta de entrada (padrão: public/media)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("artifacts/optimized-media"),
        help="pasta de saída",
    )
    parser.add_argument(
        "--format",
        choices=("webp", "jpg"),
        default="webp",
        help="formato de saída",
    )
    parser.add_argument("--max-width", type=int, default=1920)
    parser.add_argument("--quality", type=int, default=82)
    parser.add_argument(
        "--write",
        action="store_true",
        help="grava os arquivos; sem esta flag o comando é somente leitura",
    )
    parser.add_argument(
        "--report",
        action="store_true",
        help="lista também arquivos que não seriam redimensionados",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = args.root.resolve()
    output = args.output.resolve()
    if not root.is_dir():
        raise SystemExit(f"Pasta de entrada não encontrada: {root}")

    total_before = 0
    total_after = 0
    processed = 0

    for candidate in discover(root):
        total_before += candidate.bytes
        should_report = args.report or candidate.width > args.max_width
        destination = output_path(
            candidate.source,
            root,
            output,
            args.format,
        )

        if args.write:
            if destination.resolve() == candidate.source.resolve():
                total_after += candidate.bytes
                continue
            result_size = optimize(
                candidate,
                destination,
                args.max_width,
                args.quality,
                args.format,
            )
            total_after += result_size
            processed += 1
            print(
                f"{candidate.source.relative_to(root)} "
                f"{candidate.width}×{candidate.height}: "
                f"{format_size(candidate.bytes)} -> {format_size(result_size)}"
            )
        elif should_report:
            print(
                f"{candidate.source.relative_to(root)} "
                f"{candidate.width}×{candidate.height} "
                f"{format_size(candidate.bytes)}"
            )

    if args.write:
        saved = total_before - total_after
        ratio = (saved / total_before * 100) if total_before else 0
        print(
            f"\n{processed} arquivo(s) em {output}. "
            f"Economia estimada: {format_size(saved)} ({ratio:.1f}%)."
        )
    else:
        print("\nModo de inspeção: nenhum arquivo foi alterado. Use --write para gerar.")


if __name__ == "__main__":
    main()
