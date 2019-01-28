'use strict';

exports.type = 'perItem';

exports.active = false;

exports.description = 'adds attributes to all <path> elements';

var ENOCLS = `Error in plugin "addAttributesToPathElement": absent parameters.
It should have a list of "attributes" or one "attribute".
Config example:

plugins:
- addAttributesToPathElement:
    attribute: "myPath"

plugins:
- addAttributesToPathElement:
    attributes: ["myPath", "size-big"]

plugins:
- addAttributesToPathElement:
    attributes:
        - id: android
        - data-image: icon`;

/**
 * Add attributes to all <path> elements. Example config:
 *
 * plugins:
 * - addAttributesToPathElement:
 *     id: 'android'
 *
 * plugins:
 * - addAttributesToPathElement:
 *     attributes: ['data-icon', 'data-disabled']
 *
 * plugins:
 * - addAttributesToPathElement:
 *     attributes:
 *         - id: android
 *         - data-image: icon
 *
 * @author Tobias Toft (Pinterest), based on addAttributesToSVGElement.js by April Arcus
 */
exports.fn = function(item, params) {
    if (!item.isElem()) return;

    if (!params || !(Array.isArray(params.attributes) || params.attribute)) {
        console.error(ENOCLS);
        //return item;
    }

    var attributes = params.attributes || [ params.attribute ];

    if (item.isElem('path')) {
        attributes.forEach(function (attribute) {
            if (typeof attribute === 'string') {
                if (!item.hasAttr(attribute)) {
                    item.addAttr({
                        name: attribute,
                        prefix: '',
                        local: attribute
                    });
                }
            } else if (typeof attribute === 'object') {
                Object.keys(attribute).forEach(function (key) {
                    if (!item.hasAttr(key)) {
                        item.addAttr({
                            name: key,
                            value: attribute[key],
                            prefix: '',
                            local: key
                        });
                    }
                });
            }
        });
    }
};
