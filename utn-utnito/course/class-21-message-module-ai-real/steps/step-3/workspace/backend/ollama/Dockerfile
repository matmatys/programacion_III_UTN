FROM ollama/ollama:latest

COPY start_model.sh /start_model.sh
RUN chmod +x /start_model.sh

ENTRYPOINT ["/start_model.sh"]
