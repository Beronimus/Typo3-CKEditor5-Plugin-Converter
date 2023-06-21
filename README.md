# TYPO3-CKEditor5-Plugin-Converter
TYPO3 V12 uses CKEditor 5 for RTE fields in the backend. This converter bundles official CKEditor 5 plugins, so that the bundle can be loaded as custom plugin in Typo3.


## Background
TYPO3 provides a way to [add custom plugin into the backend](https://www.derhansen.de/2023/05/2023-05-05-create-a-custom-ckeditor5-plugin-for-typo3-12.html). However this does not work easly with plugins build with the default ckeitor 5 plugins. 

This project uses webpack to bundle the existing plugin. By default webpack includes all neede moduls to the bundle, which leads to the [CKEditor Error](https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-ckeditor-duplicated-modules).
 To resolve this error, Webpack needs to be configured to use modules, that are already included in the TYPO3 installation instead of adding them again to the generated bundle.

 ## Usage

This project is at the moment just a strating point and shows how plugins can be converted to be used in TYPO3. It is tested with TYPO3 12.4.2. It converts the @ckeditor/ckeditor5-font plugin.

 ### Build the ES6 Module

You need a locally installd node version, to use this converter.
Clone the project and run

    npm install
    npm run build  
 
 After that the `dist` folder contains the files needed by TYPO3.

### Customize the build for another plugin

If you want to convert another plugin, you have to consider follwing point:
* Install the plugin you want to convert with npm.
* Change the entry point of the webpack.config.js to ponit to the entry of the plugin.
* Make sure that the plugin, that you want to convert, is for the CKEditor 5 version used by your TYPO3 installation. You can find the version by searching for the term `const version =` in the file `/vendor/typo3/cms-rte-ckeditor/Resources/Public/Contrib/ckeditor5-bundle.js` in your TYPO3 installation.
* At the moment the translator only contains dependencys needed to convert the font plugin. If the plugin contains other dependencies, that are already included in the file `/vendor/typo3/cms-rte-ckeditor/Resources/Public/Contrib/ckeditor5-bundle.js`, the you have to add then to the transator.

### Including the converted plugin to TYPO3

After the build you need to copy the files in the dist folder to a folder in your TYPO3 extension.

If not existing add the file JvaScriptModule.php to your project including the import of the converted plugin.

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
