# Ansible playbook for Excuze
This provisioning script can be used to install Excuze on a Debian OS.

## Dependencies
Ansible is required. You can find it in your packet manager.

## Configuration
Set the ip of your server in `inventory/inventory.yml` under `[raspberry]`

Set your username and other variables under `[raspberry:vars]`

Set the services you want to install in `playbook.yml`

## Running
```
ansible-playbook playbook.yml -i inventory/inventory.yml --ask-become-pass
```

Enter the server's user password when prompted for the `BECOME password`.
