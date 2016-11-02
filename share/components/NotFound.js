/*
 * @Author: dmyang
 * @Date:   2016-10-21 18:01:17
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-11-02 15:32:55
 */

'use strict'

import Helmet from 'react-helmet'

const NotFound = () => (
    <div>
        <Helmet title = 'Page Not Found' />
        <h1>Page Not Found!</h1>
    </div>
)

export default NotFound
