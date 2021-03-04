
/**
 * @desc component dataForm
 * @type {JsonSchemaProperties | OverrideFormType}
 */
const dataForm = {
    nodes: {
        type: 'rich-text',
        default: '在此编辑内容...',
    },
};



/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */


/**
 * @desc component styleSchema
 * @type {EditorComponent}
 */
const config = {
    dataForm,

    __isBuildIn: true,
};

export default config;
