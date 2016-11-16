/*
* @Author: dmyang
* @Date:   2016-11-15 15:46:54
* @Last Modified by:   dmyang
* @Last Modified time: 2016-11-16 17:01:04
*/

CREATE DATABASE IF NOT EXISTS `mock_api_svr` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mock_api_svr`;

-- 匹配IP表
CREATE TABLE IF NOT EXISTS `remote_ip` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `ip` varchar(16) NOT NULL,
    `name` varchar(255),
    `author` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 ;

-- 规则表
-- handle_mode 运行模式，普通模式0，即填写各种字段匹配，执行模式1即自定义请求处理handler
CREATE TABLE IF NOT EXISTS `rule` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `env_id` int(11) DEFAULT 0,
    `handle_mode` tinyint DEFAULT 0,
    `url` int(11) NOT NULL,
    `name` varchar(255),
    `method` varchar(32) NOT NULL,
    `parameters` varchar(255),
    `req_headers` varchar(255),
    `proxy` tinyint DEFAULT 0,
    `delay` int DEFAULT 0,
    `status_code` int DEFAULT 200,
    `format` varchar(255) DEFAULT 'json',
    `charset` varchar(32) DEFAULT 'UTF-8',
    `res_headers` varchar(255),
    `body` text NOT NULL,
    `eval_code` text,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=10000 ;
