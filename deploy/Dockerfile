FROM buchgr/bazel-remote:v2.4.4

EXPOSE 8080 9092

ENTRYPOINT ["/app/bazel-remote"]
CMD ["--max_size=5", "--dir=/tmp/cache", "--http_address=0.0.0.0:8080", "--storage_mode=uncompressed"]
