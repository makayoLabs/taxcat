FROM wordpress:latest

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential autoconf pkg-config && \
    pecl install redis && \
    docker-php-ext-enable redis && \
    apt-get remove -y build-essential autoconf pkg-config && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*