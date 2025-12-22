FROM texlive/texlive:latest

COPY .config/texmf-local/ /usr/local/texlive/texmf-local/
COPY .config/.latexmkrc /root

RUN mktexlsr