# @cypress-design/color-constants

**Purpose: avoid circular dependencies**

This package holds all color constants for both the css and some component packages.

Since the CSS package has to depend on some constants packages to compile the classes necessary for components, we cannot make css a dependency of those packages.

Hence this package.
