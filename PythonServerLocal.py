#!/usr/bin/python
import socketserver
import socket
import http.server
import sys

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_my_headers(self):
        print("This is working :/")
        self.send_header("Access-Control-Allow-Origin", "*")

        http.server.SimpleHTTPRequestHandler.end_headers(self)

    def end_headers(self):
        self.send_my_headers()

print('Server listening on port 8000...')
httpd = socketserver.TCPServer(('', 8000), CORSRequestHandler)
httpd.serve_forever()
