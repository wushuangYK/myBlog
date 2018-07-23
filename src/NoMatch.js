/**
 * Created by wushuang on 2018/7/23.
 */
import React from 'react'

const NoMatch = ({ location }) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
        <h3>
            抱歉,我们找不到你要的页面了~
        </h3>
    </div>
);

export default NoMatch