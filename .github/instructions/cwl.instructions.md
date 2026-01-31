---
applyTo: '**/*.cwl'
---
# TeXstudio CWL Format Definition

## Syntax
Format: `<command>[args][#classification]`
Comment: Starts with `#`

## Argument Semantics (inside `{}` or `[]`)
- `%text`: Text (spellchecked)
- `%title`: Section title
- `%label`: Label reference
- `%bibid`: Bib ID
- `%cmd`: Command definition
- `%file`: Filename
- `%color`: Color name
- `%plain`: No processing

## Classifications (Suffix `#`)
| Key | Meaning | Key | Meaning |
| :-- | :-- | :-- | :-- |
| `S` | Structure | `T` | Title (`\title`) |
| `M` | Math mode only | `m` | No math mode |
| `n` | Text mode only | `t` | Tabbing env |
| `r` | Ref (`\ref`) | `c` | Cite (`\cite`) |
| `C` | Complex cite | `l` | Label def (`\label`) |
| `L` | Length | `d` | Def (`\newcommand`) |
| `g` | Graphic (`\includegraphics`) | `i` | Include (`\include`) |
| `u` | Package (`\usepackage`) | `b` | Bib (`\bibliography`) |
| `U` | URL | `D` | TODO item |
| `B` | Color def | `*` | Rare (hidden in completion) |

## Special Directives
- `#include:pkgname` : Load `pkgname.cwl`
- `#keyvals:cmd[,cmd2]` ... `#endkeyvals` : Define key/value pairs for `cmd`.
  - `key` or `key=#val1,val2`
  - `key##L` : Value is length
  - `key##l` : Value is label def
  - `key=%<text%>` : Value is spellchecked text
  - `#c` : Completion only (no syntax check)