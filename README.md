# CompCraft CLI - Your React Component Factory! <a href="https://www.npmjs.com/package/veestream" rel="nofollow"><img src="https://img.shields.io/npm/v/veestream.svg?style=flat" alt="NPM version" style="max-width: 100%;"></a>

![VeeStream GIF](https://github.com/farhadggu/comp-craft/raw/main/public/logo.jpg)

CompCraft CLI is a command-line tool designed to simplify and streamline your workflow by automating the generation, management, and organization of React components. Whether you're a seasoned developer or just starting out, CompCraft ensures you spend more time crafting logic than creating boilerplate code.

---

## 🚀 Features at a Glance

- **Generate Components**: Quickly generate React components with a single command.
- **Global Templates**: Store reusable components globally for use across projects.
- **Add Components**: Bring your global components into any project directory.
- **Customizable Editor**: Set your preferred code editor for seamless development.
- **Organize Components**: List or remove stored templates with ease.

---

## 📦 Installation

First, ensure you have Node.js installed on your system. Then, install CompCraft globally:

```bash
npm install -g comp-craft
```

Now, you can access the `comp-craft` command anywhere from your terminal.

---

## 🛠️ How It Works

Here's an overview of what CompCraft CLI does under the hood:

1. **Global Template Store**: Creates a hidden directory (`~/.comp-craft/templates`) to store your global React component templates.
2. **Default Configurations**: Sets up a default configuration file (`config.json`) for preferences like the default editor (VS Code by default).
3. **Commands**: A series of intuitive commands allow you to create, store, and manage components effortlessly.

---

## 🧙 Commands and Usage

### 1. Generate a New Component

Creates a new React component template and stores it globally.

```bash
comp-craft generate [componentName]
```

- **Prompts**:
  - Choose between TypeScript (`.tsx`) or JavaScript (`.jsx`).
  - Component boilerplate is automatically generated.
- **Pro Tip**: Don't have a name? The CLI will prompt you for one. No pressure, but `AwesomeButton` is always a good choice. 😉

---

### 2. Add a Component to a Project

Add an existing global component to your current project directory.

```bash
comp-craft add [componentName]
```

- **Prompts**:
  - If no component name is provided, select one from a list of stored templates.
  - Choose the destination folder in your project directory.

---

### 3. List All Components

See all available global templates at a glance.

```bash
comp-craft list
```

- **Output**: Displays a list of all stored templates. Great for the memory-challenged among us!

---

### 4. Remove a Component

Remove a component from the global store. Sometimes, you need to Marie Kondo your templates.

```bash
comp-craft remove [componentName]
```

- **Prompts**:
  - If no name is provided, select one from the list.
  - Confirms deletion before removing.

---

### 5. Set Preferred Editor

Configure your favorite code editor to open components directly.

```bash
comp-craft set-editor
```

- **Default**: VS Code (`code`).
- **Examples**: Enter any command like `vim`, `subl`, or the full path to your editor.

---

### ⚙️ Setting Up the Editor Path

If you're using a specific editor and CompCraft cannot open it directly, you'll need to provide the **full pathname** to the editor's executable.

For example:

- **VS Code**: `/path/to/code` (commonly install on path `C:\Users\<your name>\AppData\Local\Programs\Microsoft VS Code\Code.exe`)

You can set the editor path during the `set-editor` command:

```bash
comp-craft set-editor
```

If unsure, find your editor's path by searching online or consulting the editor's documentation.

---

## 🤓 Example Workflow

1. Generate a reusable button component:

   ```bash
   comp-craft generate Button
   ```

2. Add it to your current project:

   ```bash
   comp-craft add Button
   ```

3. Forget where you saved that fancy modal? List your templates:

   ```bash
   comp-craft list
   ```

4. No longer need that redundant `MyOldComponent`? Remove it:

   ```bash
   comp-craft remove MyOldComponent
   ```

5. Update your preferred editor to Sublime Text:

   ```bash
   comp-craft set-editor
   ```

---

## 🤔 Why Use CompCraft?

- **Save Time**: Spend less time writing boilerplate and more time solving real problems.
- **Stay Organized**: Centralize your components and reuse them across projects.
- **Seamless Integration**: Works with your preferred editor and tools.
- **Less Typing, More Doing**: The CLI handles all the repetitive tasks so you don't have to.

---

## 🃏 Developer Jokes (Because Why Not?)

- Why did the JavaScript developer wear glasses?  
  Because they couldn't `C#` 🥴.

- I told my React component a joke, but it didn’t laugh.  
  Guess it wasn’t in a good state 😁.

---

## 💡 Tips & Tricks

- **Template Customization**: Modify the templates in the global store (`~/.comp-craft/templates`) to fit your project's style guide.
- **Editor Path Issues**: If your editor doesn’t open, ensure its executable is in your system's PATH or provide the full path during `set-editor`.

---

## 📜 License

CompCraft CLI is open-source and free for personal and commercial use. Feel free to contribute or suggest new features!

---

## 🎉 Closing Note

CompCraft CLI aims to make React development faster, smoother, and more enjoyable. We hope it sparks joy in your workflow! If you find it helpful, share it with your dev friends or leave a star on our [GitHub repo](https://github.com/farhadggu/comp-craft).

Happy coding! 🚀
