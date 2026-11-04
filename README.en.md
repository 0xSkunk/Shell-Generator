# Shell Generator

[🇪🇸 Español](README.md) | [🇬🇧 English](README.en.md)

> A cross-platform, dependency-free reverse shell and bind shell command generator. Everything runs directly in your browser.

![Status](https://img.shields.io/badge/status-active-34d399?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/vanilla-JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Dependencies](https://img.shields.io/badge/dependencies-0-6366f1?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-22d3ee?style=flat-square)

---

## 📖 Description

**Shell Generator** is a static web application that instantly generates **reverse shell** and **bind shell** commands for multiple operating systems and programming languages (Bash, Netcat, Ncat, Socat, Python, Perl, Ruby, PHP, PowerShell, Java, C, C#, Golang, Lua, Node.js, Dart, Crystal, Awk, and more).

Enter your **IP address** and **port**, select a payload, filter by operating system or search by name, and copy the generated command. The right-hand panel automatically generates the corresponding **listener** (in reverse mode) or **connection command** (in bind mode).

Designed for **CTFs, pentesting labs, and authorized security testing environments**. Everything runs entirely in your browser: **no backend, no tracking, and no server requests**, except for font loading.

---

## 🌐 Demo

- **GitHub Pages**: [https://0xskunk.github.io/shell-generator/](https://0xskunk.github.io/shell-generator/)

---

## 📚 How to use

1. **Mode** — Select Reverse or Bind using the toggle at the top.
2. **IP / Port** — Enter your attacker IP address (or the target's IP in bind mode) and port.
3. **Filter** — Use the All / Linux / Windows / macOS tabs and/or the name search bar.
4. **Payload** — Click on a payload in the sidebar.
5. **Shell (reverse only)** — Select the shell you want to use (`/bin/sh`, `bash`, `zsh`, `dash`, `cmd.exe`, `powershell.exe`, etc.). In bind mode, the selector is locked to the platform's default value to prevent errors.
6. **Encoding** — Choose None, Base64, URL encode, or Double URL encode.
7. **Listener / Connection** — The right-hand panel provides the listener command (`nc -lvnp`, `rlwrap`, `socat`, Metasploit, Hoaxshell, etc.) or the command to connect to the target (bind mode).
8. **Copy** — Click the Copy button in either terminal.

> 💾 All settings (IP, port, mode, payload, filter, shell per OS, and encoding) are saved in `localStorage` and automatically restored when the page is reloaded.

---

## ✨ Features

### Shells

- 🐧 **Reverse shells** with ~100 payloads across multiple programming languages and operating systems.
- 🔗 **Bind shells** with native payloads for each OS.
- 🎯 **OS filtering**: Linux, Windows, and macOS.
- 🔍 **Real-time search** by payload name.
- 🐚 **Dynamic shell selector** based on the payload's OS (`sh`, `bash`, `dash`, `zsh`, `/bin/*`, `cmd.exe`, `powershell.exe`).
  - Automatically **disabled** when the payload does not use `{shell}` (PowerShell, direct Bash, webshells, etc.).
  - **Locked in bind mode** to the platform's default value.

#### Supported languages and payloads

| **Category** | **Included payloads** |
| :--- | :--- |
| **Native shells** | Bash (`/dev/tcp`, `196`, `read line`, `5`, UDP), zsh, `nc`, `ncat`, Busybox, Socat, `telnet`, `curl` |
| **Scripting** | Python 2/3 (multiple variants), Perl, Ruby, PHP (exec, shell_exec, passthru, system, popen, proc_open, backtick, socket), Lua, Node.js |
| **Compiled languages** | C, C#, C++, Java, Golang, Dart, Crystal, Haskell, Vlang |
| **Windows** | PowerShell #1–#5 (including TLS and Base64), ConPTY, `nc.exe`, `ncat.exe`, Python Windows, C Windows |
| **Webshells** | PHP (PentestMonkey, Ivan Sincek, cmd, cmd 2, cmd small), P0wny Shell, JSP, JSP Two-Way, JavaScript (JSR223), Groovy |

---

## ⚠️ Security disclaimer

> This project is intended exclusively for educational purposes and authorized security testing.

---

## ❌ Prohibited use

- Accessing systems, maintaining access, or exfiltrating data without explicit written authorization.
- Using the tool against third-party production systems without permission.
- Any activity that violates applicable laws.

---

## 🙏 Credits and references

This project would not exist without the work of the community. Payloads have been adapted from:

- [**PayloadsAllTheThings** — Reverse Shell Cheatsheet](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [**PentestMonkey** — Reverse Shell Cheat Sheet](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
- [**revshells.com**](https://www.revshells.com/) — UX and layout inspiration.
- [**HackTricks**](https://book.hacktricks.xyz/) — General reference.
- [**ConPtyShell**](https://github.com/antonioCoco/ConPtyShell) — @antonioCoco.
- [**pwncat-cs**](https://github.com/calebstewart/pwncat).
- [**PayloadsAllTheThings / Reverse Shell**](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for the full license text.

---

⭐ **If you find this tool useful, consider giving the repository a star!** ⭐