# TYPO3-CKEditor5-Plugin-Converter
TYPO3 V12 uses CKEditor 5 for RTE fields in the backend. This converter bundles official CKEditor 5 plugins, so that the bundle can be loaded as custom plugin in Typo3.


## Background
TYPO3 provides a way to [add custom CKEditor plugins into the backend](https://www.derhansen.de/2023/05/2023-05-05-create-a-custom-ckeditor5-plugin-for-typo3-12.html). However this does not work easly with plugins build for ckeditor 5.

This project uses webpack to bundle the existing plugin. By default webpack includes all needed modules to the bundle, which leads to the [CKEditor Error](https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-ckeditor-duplicated-modules).
 To resolve this error webpack needs to be configured to use modules, that are already included in the TYPO3 installation (instead of adding them to the new generated bundle).

 ## Usage

This project is at the moment just a strating point and shows how plugins can be converted to be used in TYPO3. It is tested with TYPO3 12.4.2. It converts the @ckeditor/ckeditor5-font plugin.

 ### Build the ES6 Module

You need a locally installd node version, to use this converter.
Clone the project and run

    npm install
    npm run build  
 
 After that the `dist` folder contains the files needed by TYPO3.

### Customize the build for another plugin

If you want to convert another plugin, you have to consider follwing points:
* You may have to install the plugin you want to convert in this project (probably using npm).
* Change the entry point of the webpack.config.js to ponit to the entry of the plugin.
* Make sure that the plugin, that you want to convert, is for the CKEditor 5 version used in your TYPO3 installation. You can find the version by searching for the term `const version =` in the file `/vendor/typo3/cms-rte-ckeditor/Resources/Public/Contrib/ckeditor5-bundle.js` in your TYPO3 installation.
* At the moment the translator only contains dependencies needed to convert the `font` plugin. If your plugin contains dependencies, that are included in the file `/vendor/typo3/cms-rte-ckeditor/Resources/Public/Contrib/ckeditor5-bundle.js` but not in one of the translator files, then you have to add them to a translator file located in the `src` folder.

### Including the converted plugin to TYPO3

After the build you need to copy the files in the dist folder to a folder in your TYPO3 extension.

If not existing add the file JavaScriptModules.php to your project including the import of the converted plugin.

    <?php

    return [
        'dependencies' => [
            'backend',
        ],
        'tags' => [
            'backend.form',
        ],
        'imports' => [
            '@extension-name/ckeplugins/cke-font-plugin.js' => 'EXT:extension-name/Resources/Public/plugins/cke-font-plugin.js',
        ],
    ];

Edit your RTE yaml configuration. Import the plugin and add items if needed.

    editor:
        config:
            importModules:
            - "@extension-name/ckeplugins/cke-font-plugin.js"
            - ...

            toolbar:
                items:
                    - fontSize
                    - fontFamily
                    - fontColor
                    - fontBackgroundColor
                    - heading
                    - ...

Additionl information:
- [How to create a custom CKEditor 5 plugin for TYPO3 12.4](https://www.derhansen.de/2023/05/2023-05-05-create-a-custom-ckeditor5-plugin-for-typo3-12.html)
- [How Do I Use a Different Preset?](https://docs.typo3.org/c/typo3/cms-rte-ckeditor/main/en-us/Configuration/Examples.html)
- [ES6 in the TYPO3 Backend](https://docs.typo3.org/m/typo3/reference-coreapi/main/en-us/ApiOverview/Backend/JavaScript/ES6/Index.html) 

## Contribution

Let me now if you have any ideas or want to help to improve the project.
