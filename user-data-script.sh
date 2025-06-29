#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# Update the package index
dnf update -y

# Install Docker
dnf install -y docker

# Enable and start the Docker service
systemctl enable docker
systemctl start docker

# Add the 'ec2-user' to the 'docker' group to run docker without sudo
usermod -aG docker ec2-user
