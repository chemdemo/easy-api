/*
* @Author: yangdemo
* @Date:   2016-11-29 15:53:34
* @Last Modified by:   yangdemo
* @Last Modified time: 2016-11-29 17:26:21
*/

'use strict'

// @see https://github.com/Khan/aphrodite/pull/95

import { StyleSheet } from 'aphrodite/no-important'

const globalExtension = {
    selectorHandler: (selector, _, generateSubtreeStyles) => {
        if (selector[0] !== '*') return null

        return generateSubtreeStyles(selector.slice(1))
    }
};

const {css, ExtendedStyleSheet} = StyleSheet.extend([globalExtension])

const cssGlobal = globalStyles => {
    const styles = {}

    Object.keys(globalStyles).forEach(key => {
        styles['*' + key] = globalStyles[key]
    })

    css(StyleSheet.create({
        global: styles,
    }).global)
}

export { cssGlobal, StyleSheet, css }
