'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes fill-rule attributes';

exports.params = {
    fill: true,
};

var shape = require('./_collections').elemsGroups.shape,
    container = require('./_collections').elemsGroups.container

/**
 * Remove useless stroke and fill attrs.
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item, params) {

    // remove fill-rule on shapes
    if (params.fill && (item.isElem(shape) || item.isElem(container)) && !item.computedAttr('id')) {
        item.eachAttr(function(attr) {
            if (attr.name === 'fill-rule') {
                item.removeAttr(attr.name);
            }
        });
    }

};
