FROM buchgr/bazel-remote-cache:latest

EXPOSE 8080

CMD ["--max_size=5", "--dir=/tmp/cache", "--http_address=0.0.0.0:8080", "--storage_mode=uncompressed"]
