#!/usr/bin/env perl

$pdf_mode = 4;
$lualatex = 'lualatex -synctex=1 -interaction=nonstopmode %O %S';

$bibtex = 'upbibtex %O %S';
$biber = 'biber %O %S';

$makeindex = 'upmendex %O -o %D %S';