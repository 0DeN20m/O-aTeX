#include:luatexja
#include:amsmath
#include:amssymb
#include:amsthm
#include:hyperref
#include:makeidx
#include:luatexja-ruby
#include:bm
#include:cleveref
#include:autonum

# theorem environments

\begin{axiom}#n
\begin{axiom}[heading]#n
\end{axiom}#n
\begin{axiom*}#n
\begin{axiom*}[heading]#n
\end{axiom*}#n

\begin{definition}#n
\begin{definition}[heading]#n
\end{definition}#n
\begin{definition*}#n
\begin{definition*}[heading]#n
\end{definition*}#n

\begin{proposition}#n
\begin{proposition}[heading]#n
\end{proposition}#n
\begin{proposition*}#n
\begin{proposition*}[heading]#n
\end{proposition*}#n

\begin{theorem}#n
\begin{theorem}[heading]#n
\end{theorem}#n
\begin{theorem*}#n
\begin{theorem*}[heading]#n
\end{theorem*}#n

\begin{lemma}#n
\begin{lemma}[heading]#n
\end{lemma}#n
\begin{lemma*}#n
\begin{lemma*}[heading]#n
\end{lemma*}#n

\begin{corollary}#n
\begin{corollary}[heading]#n
\end{corollary}#n
\begin{corollary*}#n
\begin{corollary*}[heading]#n
\end{corollary*}#n

\begin{example}#n
\begin{example}[heading]#n
\end{example}#n
\begin{example*}#n
\begin{example*}[heading]#n
\end{example*}#n

\begin{question}#n
\begin{question}[heading]#n
\end{question}#n
\begin{question*}#n
\begin{question*}[heading]#n
\end{question*}#n

\begin{answer}#n
\begin{answer}[heading]#n
\end{answer}#n
\begin{answer*}#n
\begin{answer*}[heading]#n
\end{answer*}#n

\begin{myproof}#n
\begin{myproof}[heading]#n
\end{myproof}#n

# functions

\GenericMathOperator{symbol}#*
\GenericMathOperator*{symbol}#*
\GenericMathOperator{symbol}[sub]#*
\GenericMathOperator*{symbol}[sub]#*
\GenericMathOperator{symbol}[sub][super]#*
\GenericMathOperator*{symbol}[sub][super]#*
\GenericMathOperator[font]{symbol}#*
\GenericMathOperator*[font]{symbol}#*
\GenericMathOperator[font]{symbol}[sub]#*
\GenericMathOperator*[font]{symbol}[sub]#*
\GenericMathOperator[font]{symbol}[sub][super]#*
\GenericMathOperator*[font]{symbol}[sub][super]#*

\GenericTuple{lparen}{rparen}{content}#*
\GenericTuple{lparen}{rparen}{content}[sub]#*
\GenericTuple{lparen}{rparen}{content}[sub][super]#*

\GenericVariable{symbol}#*
\GenericVariable{symbol}[sub]#*
\GenericVariable{symbol}[sub][super]#*
\GenericVariable[font]{symbol}#*
\GenericVariable[font]{symbol}[sub]#*
\GenericVariable[font]{symbol}[sub][super]#*

# symbols

\naturalnumbers#m
\N#m
\integers#m
\Z#m
\rationalnumbers#m
\Q#m
\realnumbers#m
\R#m
\complexnumbers#m
\C#m
\dummy#m

# tuples

\tuple{content}#m
\norm{of}#m
\norm[on]{of}#m
\innerproduct{elem1}{elem2}#m
\innerproduct[for]{elem1}{elem2}#m
\innerprod{elem1}{elem2}#m
\innerprod[for]{elem1}{elem2}#m

# operators

\identitymap#m
\identitymap[of]#m
\id#m
\id[of]#m
\automorphisms#m
\automorphisms[in]#m
\Aut#m
\Aut[in]#m
\endomorphisms#m
\endomorphisms[in]#m
\End#m
\End[in]#m
\homset#m
\homset[in]#m
\Hom#m
\Hom[in]#m
\isometries#m
\isometries[on]#m
\Isom#m
\Isom[on]#m

# variables

\distance{var}#m
\distance[on]{var}#m
\vect{var}#m
\map{map}{domain}{codomain}#m

# makeidx

\term{term}#n
\term[yomi]{term}#n
\term{term}[alt]#n
\term[yomi]{term}[alt]#n
\term*{term}#n
\term*[yomi]{term}#n
\term*{term}[alt]#n
\term*[yomi]{term}[alt]#n