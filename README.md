# Shell Generator

[🇪🇸 Español](README.md) | [🇬🇧 English](README.en.md)

> Generador de comandos de reverse shell y bind shell, multiplataforma y sin dependencias. Todo se ejecuta en el navegador.

![Status](https://img.shields.io/badge/status-active-34d399?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/vanilla-JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Dependencies](https://img.shields.io/badge/dependencies-0-6366f1?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-22d3ee?style=flat-square)

---

## 📖 Descripción

**Shell Generator** es una aplicación web estática que genera al instante comandos de **reverse shell** y **bind shell** para múltiples sistemas operativos y lenguajes (Bash, Netcat, Ncat, Socat, Python, Perl, Ruby, PHP, PowerShell, Java, C, C#, Golang, Lua, Node.js, Dart, Crystal, Awk y más).

Introduce tu **IP** y **puerto**, elige el payload, filtra por sistema operativo o busca por nombre, y copia el comando listo para usar. El panel derecho genera automáticamente el **listener** (en modo reverse) o el **comando de conexión** (en modo bind) correspondiente.

Pensada para **CTFs, laboratorios de pentesting y entornos autorizados**. Se ejecuta íntegramente en el navegador: **no hay backend, no hay tracking ni llamadas a servidores**, salvo la carga de fuentes.

---

## 🌐 Demo

- **GitHub Pages**: [https://0xskunk.github.io/shell-generator/](https://0xskunk.github.io/shell-generator/)

---

## 📚 Cómo usarlo

1. **Modo** — Elige Reverse o Bind en el interruptor superior.
2. **IP / Puerto** — Introduce tu IP de atacante (o la del objetivo en modo bind) y el puerto.
3. **Filtrar** — Utiliza las pestañas All / Linux / Windows / macOS y/o el buscador por nombre.
4. **Payload** — Haz clic en el payload de la lista lateral.
5. **Shell (solo reverse)** — Elige la shell que quieres utilizar (`/bin/sh`, `bash`, `zsh`, `dash`, `cmd.exe`, `powershell.exe`, etc.). En modo bind, el selector queda fijado al valor predeterminado de la plataforma para evitar errores.
6. **Encoding** — Selecciona None, Base64, URL encode o Double URL encode.
7. **Listener / Connection** — El panel derecho proporciona el comando para escuchar (`nc -lvnp`, `rlwrap`, `socat`, Metasploit, Hoaxshell, etc.) o para conectarse al objetivo (bind).
8. **Copiar** — Pulsa el botón Copy de cada terminal.

> 💾 Todo el estado (IP, puerto, modo, payload, filtro, shell por OS y encoding) se guarda en `localStorage` y se restaura automáticamente al recargar la página.

---

## ✨ Características

### Shells

- 🐧 **Reverse shell** con ~100 payloads en múltiples lenguajes y sistemas operativos.
- 🔗 **Bind shell** con payloads nativos por OS.
- 🎯 **Filtro por SO**: Linux, Windows y macOS.
- 🔍 **Buscador** en tiempo real por nombre de payload.
- 🐚 **Selector de shell dinámico** según el OS del payload (`sh`, `bash`, `dash`, `zsh`, `/bin/*`, `cmd.exe`, `powershell.exe`).
  - Se **deshabilita automáticamente** si el payload no utiliza `{shell}` (PowerShell, Bash directo, webshells, etc.).
  - Se **bloquea en modo bind** al valor predeterminado de la plataforma.

#### Lenguajes cubiertos

| **Familia** | **Payloads incluidos** |
| :--- | :--- |
| **Shell nativo** | Bash (`/dev/tcp`, `196`, `read line`, `5`, UDP), zsh, `nc`, `ncat`, Busybox, Socat, `telnet`, `curl` |
| **Scripting** | Python 2/3 (varias variantes), Perl, Ruby, PHP (exec, shell_exec, passthru, system, popen, proc_open, backtick, socket), Lua, Node.js |
| **Compilados** | C, C#, C++, Java, Golang, Dart, Crystal, Haskell, Vlang |
| **Windows** | PowerShell #1–#5 (incluyendo TLS y Base64), ConPTY, `nc.exe`, `ncat.exe`, Python Windows, C Windows |
| **Webshells** | PHP (PentestMonkey, Ivan Sincek, cmd, cmd 2, cmd small), P0wny Shell, JSP, JSP Two-Way, JavaScript (JSR223), Groovy |

---

## ⚠️ Disclaimer de seguridad

> Este proyecto tiene fines exclusivamente educativos y de pruebas de seguridad autorizadas.

---

## ❌ Uso prohibido

- Acceder, mantener acceso o exfiltrar datos de sistemas sin autorización explícita y por escrito.
- Uso en producción de terceros sin permiso.
- Cualquier actividad que infrinja las leyes aplicables.

---

## 🙏 Créditos y referencias

Este proyecto no existiría sin el trabajo de la comunidad. Los payloads han sido adaptados de:

- [**PayloadsAllTheThings** — Reverse Shell Cheatsheet](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [**PentestMonkey** — Reverse Shell Cheat Sheet](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
- [**revshells.com**](https://www.revshells.com/) — Inspiración de UX y organización.
- [**HackTricks**](https://book.hacktricks.xyz/) — Referencia general.
- [**ConPtyShell**](https://github.com/antonioCoco/ConPtyShell) — @antonioCoco.
- [**pwncat-cs**](https://github.com/calebstewart/pwncat).
- [**PayloadsAllTheThings / Reverse Shell**](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md).

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT — consulta el archivo [LICENSE](LICENSE) para ver el texto completo.

---

⭐ **Si esta herramienta te ha servido, déjale una estrella al repo** ⭐

