declare interface ButtonOptions {
    /* (optional)
    icon name

    * ## Example:
    * ```
    icon: 'octoface',
    ```
     */
    icon?: string

    /* (optional)
    icon set name.
    It can be chosen among these:
       - not given : if `iconset` is not given Octicons (default Atom's flavour) is chosen
       - `ion` with `ios-` and `md- `prefixes for the icon names (Ionicons)
       - `fa` and fab for brands (FontAwesome)
       - `fi` (Foundation)
       - `icomoon` (IcoMoon)
       - `devicon` (Devicon)
       - `mdi` (MaterialDesignIcons)

    * ## Example:
    * ```
        icon: 'ios-gear-a',
        iconset: 'ion'
        ```
     */
    iconset?:
        | undefined
        | "ion"
        | "fa"
        | "fab"
        | "fi"
        | "icomoon"
        | "devicon"
        | "mdi"
        | string

    /* (optional)
     You can use `text` to:
       - add text as a button, or
    * ## Example:
    * ```
        text: 'hello',
    ```

      - use HTML for a button. Needs `html` to be set to `true`

    * ## Example:
    * ```
    text: '<b>BIG</b> button',
    html: true,
    ```
    * */
    text?: string

    /* (optional)
     if set to `true`, `text` will be rendered as HTML
    * ## Example:
    * ```
    text: '<b>BIG</b> button',
    html: true,
    ```
    * */
    html?: boolean

    /* (mandatory)

    The callback must be an Atom command string, a custom callback function or an object where the keys are key modifiers (alt, ctrl or shift) and the values are commands or custom functions

    * ## Example:
    * ```
        callback: 'application:about',
    ```
    *
    *
    * ## Example - Callback with modifiers
    ```
    callback: {
      '': 'application:cmd-1',      // Without modifiers is default action
      'alt': 'application:cmd-2',
      'ctrl': 'application:cmd-3',  // With function callback
      'shift'(data) {
        console.log(data);
      },
      'alt+shift': 'application:cmd-5',       // Multiple modifiers
      'alt+ctrl+shift': 'application:cmd-6'   // All modifiers
    },
    data: 'foo'
     */
    callback:
        | string
        | Array<string>
        | ((data?: any) => void)
        | { [modifier: string]: string }
        | { [modifier: string]: (data?: any) => void }

    // If callback is of type `(data: any) => void)` or `{ [modifier: string]: ((data: any) => void) }`, `data` can be passed as the input argument.
    data?: any

    // (optional) defaults to `50`
    priority?: number

    /* (optional)
        The tooltip option may be a string or an object that is passed to Atom's TooltipManager
    */
    tooltip?: string | object

    // (optional) Color of the button
    color?: string

    // (optional) Color of the button's background
    background?: string

    /* Buttons can be styled with arbitrary CSS through classes.
    An example of how the class can be used is show below.

    * ## Example:
    * ```
        class: 'my-awesome-class'
    ```

    * ## Example:
    * ```
        class: ['multiple', 'classes', 'also', 'works']
    ```
     */
    class?: string | Array<string>
}

declare interface SpacerOptions {
    // (optional) defaults to `50`
    priority?: number
}

export declare class ToolBarManager {
    // Adds a button. The input to this function is a `ButtonOptions` object
    addButton(options: ButtonOptions): void

    // Adds a spacer. Optionally, you can pass a `SpacerOptions` object
    addSpacer(options?: SpacerOptions): void

    // Use the method removeItems to remove the buttons added by your package. This is particular useful in your package deactivate method, but can be used at any time.
    removeItems(): void

    // The onDidDestroy method takes a function that will be called when the tool-bar package is destroyed. This is useful if your package needs to do cleanup when the tool-bar is deactivated but your package continues running.
    onDidDestroy(callback: () => void): void
}

/*

Passed as an input to `consumeToolBar(getToolBar: getToolbarCallback)` function of your package.

In your main package file, add the following methods and replace your-package-name with your package name.
* ```js

let toolBar: ToolBarManager
*
export function consumeToolBar(getToolBar: getToolbarCallback) {
  toolBar = getToolBar("packageName");
  // Add buttons and spacers here...
}

*
export function deactivate() {
  if (toolBar) {
    toolBar.removeItems();
    toolBar = null;
  }
}
```
*/
type getToolbarCallback = (packageName: string) => ToolBarManager
