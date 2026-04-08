
resource "aws_key_pair" "mykey" {
    key_name = "terraform-ansible-key1"
    #public_key = file("C:/Users/username/.ssh/id_rsa.pub")
    public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "ssh-allow" {
    name = "allow-ssh-ansible"
    description = "Allow only ssh port"
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "reactjs-allow" {
    name = "allow-reactjs"
    description = "Allow only reactjs port"
    ingress {
        from_port = 3000
        to_port = 3000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "spring-allow" {
    name = "allow-spring"
    description = "Allow only spring port"
    ingress {
        from_port = 7093
        to_port = 7093
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "jaeger-allow" {
    name = "allow-jaeger"
    description = "Allow only jaeger port"
    ingress {
        from_port = 16686
        to_port = 16686
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group" "prometheus-allow" {
    name = "allow-prometheus"
    description = "Allow only prometheus port"
    ingress {
        from_port = 9090
        to_port = 9090
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}


data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "servers" {
    ami = data.aws_ami.amazon_linux.id
    instance_type = "m7i-flex.large"
    key_name = aws_key_pair.mykey.key_name
    root_block_device {
	  volume_size           = 40
	  volume_type           = "gp3"
	  delete_on_termination = true
	  encrypted             = true
    }
    vpc_security_group_ids = [aws_security_group.ssh-allow.id,aws_security_group.reactjs-allow.id,aws_security_group.spring-allow.id,aws_security_group.jaeger-allow.id,aws_security_group.prometheus-allow.id]

    connection {
                type     = "ssh"
                user     = "ec2-user"
                private_key = file("~/.ssh/id_rsa")
                host = aws_instance.servers.public_ip
        }

	provisioner "remote-exec" {
    		inline = [
			"sudo yum install git -y",
			"sudo yum install docker-io -y",
  			"sudo hostnamectl set-hostname demo.example.com",
			"sudo systemctl start docker",
			"sudo systemctl enable docker",
			"sudo usermod -aG docker $USER",
			"sudo mkdir -p /usr/local/lib/docker/cli-plugins",
			"sudo curl -SL https://github.com/docker/compose/releases/download/v2.25.0/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose",
			"sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose",
    			"cd /home/ec2-user && git clone https://github.com/lavatech321/Monitoring_Stack_App.git && cd Monitoring_Stack_App/app", 
			"sed -i 's/REPLACE-IP/${self.public_ip}/g' react-app/weather_app_frontend/src/service/WeatherService.js",
			"sudo docker compose up -d",
   		 ]
  	}
}

output "EC2-Instance-access-details" {
	value = "ssh -i ~/.ssh/id_rsa ec2-user@${aws_instance.servers.public_ip} \n"
}

output "SpringBoot-Application-Backend" {
	value = "http://${aws_instance.servers.public_ip}:7093 \n"
}

output "React-Application-Frontend" {
	value = "http://${aws_instance.servers.public_ip}:3000 \n"
}

output "Jaeger-Distributed-Tracing" {
	value = "http://${aws_instance.servers.public_ip}:16686 \n"
}

output "Prometheus-Monitoring" {
	value = "http://${aws_instance.servers.public_ip}:9090 \n"
}
