#include:luatexja
#include:amsmath
#include:amssymb
#include:amsthm
#include:hyperref
#include:makeidx
#include:luatexja-ruby

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
\integers#m
\rationalnumbers#m
\realnumbers#m
\complexnumbers#m
\dummy#m

# tuples

\tuple{content}#m
\norm{of}#m
\norm[on]{of}#m
\innerproduct{elem1}{elem2}#m
\innerproduct[for]{elem1}{elem2}#m

# operators

\identitymap#m
\identitymap[of]#m
\automorphisms#m
\automorphisms[in]#m
\endomorphisms#m
\endomorphisms[in]#m
\homset#m
\homset[in]#m
\isometries#m
\isometries[on]#m

# variables

\distance{var}#m
\distance[on]{var}#m

# makeidx

\term{term}#n
\term[yomi]{term}#n
\term{term}[alt]#n
\term[yomi]{term}[alt]#n