'use strict'
let env = process.env.NODE_ENV || 'development'

exports.getBaseData = function () {
	return {
		minAssets: process.env.NODE_ENV === 'production' ? '.min' : ''
	}
}
