---
title: "Hugo's Go-To Stack for Building Maintainable Software"
excerpt: "Here's a quick summary of my go-to tech stack for software development. My experience comes from being highly active on GitHub, with over 5,000 contributions in 2024. Additionally, I'll share insights on writing maintainable, clean, and scalable code."
coverImage: "/images/banner/posts/hugo-s-go-to-stack-for-building-maintainable-software.webp"
date: "2025-01-09"
author:
  name: 1chooo
  avatar: "https://github.com/1chooo.png"
ogImage:
  url: "/images/banner/posts/hugo-s-go-to-stack-for-building-maintainable-software.webp"
publishedAt: "2025-01-09"
lastModifiedAt: "2025-01-09"
categories:
  - React
  - Python
tags:
  - React
  - Web Development
  - Clean Code
  - Software Development
  - Software Engineering
---

Hey there 👋 This is Hugo. Here's a quick summary of my go-to tech stack for Software Development. My experience comes from being highly active on GitHub, with over 5,000 contributions in 2024 (check it out [here](https://github.com/1chooo?tab=overview&from=2024-12-01&to=2024-12-31)). Additionally, I'll share insights on writing maintainable, clean, and scalable code.

![Hugo's Go-To Stack for Building Software](/images/banner/posts/hugo-s-go-to-stack-for-building-maintainable-software.webp)

## React

### Function Components

We only use `FC` type when we need to pass and extract children from props [^1]. Otherwise, we use the function declaration. Refer [here](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/) for a more extensive section explaining why `React.FC` should mostly be avoided.

```tsx {5}
// Avoid
interface Props {
  text?: string;
}

const Heading: React.FC<Props> = ({ text = "Hello, world!" }) => {
  return <h1>{text}</h1>;
};
```

```tsx {5}
// Prefer
interface Props {
  text?: string;
}

function Heading({ text = "Hello, world!" }: Props) {
  return <h1>{text}</h1>;
}
```

## Python

### Docstring and Type Hint

We must have docstring and type hint for every public class and method/function. The format of the docstring is as follows:

```python
class MyClass:
    """summary of class

    Attributes:
        attr1 (int): description of attr1
        attr2 (str): description of attr2

    methods:
        method1: description of method1
    """
    attr1: int
    attr2: str

    def method1(self, arg1: int, arg2: str) -> str:
        """summary of method1

        Args:
            arg1 (int): description of arg1
            arg2 (str): description of arg2

        Returns:
            str: description of return value
        """
        return
```

```python
def func(arg1: int, arg2: str) -> str:
    """summary of function

    Args:
        arg1 (int): description of arg1
        arg2 (str): description of arg2

    Returns:
        str: description of return value
    """
    return
```

### Naming Convention

We follow the naming convention as follows:

1. class name: `CamelCase`
2. method/function name: `snake_case`
3. private method/function name: `_snake_case`
4. variable name: `snake_case`
5. private variable name: `_snake_case`
6. read only constant name: `UPPER_SNAKE_CASE`

## Coding Patterns

### Larger files > many small components

Many people advocate for clean, modular, and maintainable code. While these principles are essential, there are drawbacks when we scale this approach to large codebases, especially those with millions of lines of code.

Over-splitting components can lead to excessive files, which increases maintenance costs, introduces unnecessary complexity, and can even make the codebase harder to understand. In extreme cases, the team may spend far more time deciphering the logic of the codebase than actually implementing features or fixing bugs. For instance, it becomes a frustrating and time-consuming process if we want to edit a minor feature or fix a tiny bug but need to navigate through dozens of files to fully grasp the logic. It's akin to wanting to cut down a single tree but having to traverse an entire forest.

As a result, it's essential to strike a balance between maintaining clean code and ensuring long-term maintainability so that the codebase remains understandable and manageable without becoming overly fragmented.

> Copy/paste is better than the wrong abstraction - [Lee Robinson (leerob)](https://leerob.com/), VP of Product [@vercel](https://vercel.com/home) ([Source](https://leerob.com/n/stack))

> The wrong duplication is better than the wrong abstraction.

[^1]: [Why "he" does not write React.FC on each function?](https://stackoverflow.com/questions/71189879/why-he-does-not-write-react-fc-on-each-function)
