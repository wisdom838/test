var fs = require('fs');
global.envType = process.env.NODE_ENV
var umsConfig = {}
var mtConfig = {}
var certificateOptions = {}
switch (envType) {
	case "bijibbiz":
		/** UMS DB JSON **/
		umsConfig = { host: 'localhost', user: 'bijibbiz_user', password: 'Bijib123$', database: 'bijibbiz_mapplication' }
		/** MT DB JSON **/
		mtConfig = { host: 'localhost', user: 'bijibbiz_user', password: 'Bijib123$', database: 'bijib_synole' }
		certificateOptions = {ca: fs.readFileSync('/etc/certs/ca.crt'),	key: fs.readFileSync('/etc/certs/biz.key'),	cert: fs.readFileSync('/etc/certs/biz.crt')	}
		break;
	case "bijibin":
		/** UMS DB JSON **/
		umsConfig = { host: 'localhost', user: 'bijibin_user', password: 'Bijib123$', database: 'bijibin_ums' }
		/** MT DB JSON **/
		mtConfig = { host: 'localhost', user: 'bijibin_user', password: 'Bijib123$', database: 'bijibin_newroster' }
		certificateOptions = {ca: fs.readFileSync('/etc/pki/tls/certs/bijibin/bijibin.crt'),key: fs.readFileSync('/etc/pki/tls/certs/bijibin/bijibin.key'),	cert: fs.readFileSync('/etc/pki/tls/certs/bijibin/bijibin.crt')}
		break;
	case "bijibdemo":
		/** UMS DB JSON **/
		umsConfig = { host: 'localhost', user: 'bijibdem_user', password: 'bijibdem987$', database: 'bijibdem_ums' }
		/** MT DB JSON **/
		mtConfig = { host: 'localhost', user: 'root', password: '', database: 'bijib_synole' }
		break;

	case "bijibcom":
		/** UMS DB JSON **/
		umsConfig = { host: 'localhost', user: 'bijibco_umsadm', password: 'in456$', database: 'bijibco_bijibdb' }
		/** MT DB JSON **/
		mtConfig = { host: '111.67.26.145', user: 'bijibco_nmtuser', password: 'nPowerb189$', database: 'bijibco_nmt' }
			/** Certificate Paths JSON **/
		certificateOptions = {ca: fs.readFileSync('/etc/pki/tls/certs/new/ca'),key: fs.readFileSync('/etc/pki/tls/certs/new/key'),cert: fs.readFileSync('/etc/pki/tls/certs/new/crt')}
		break;
	case "hospservices":
		/** UMS DB JSON **/
		umsConfig = { host: 'localhost', user: 'hospserv_admin', password: 'hosp189$', database: 'hospserv_woba' }
		/** MT DB JSON **/
		mtConfig = { host: 'localhost', user: 'root', password: '', database: 'bijib_synole' }
		break;
	default:		
		/** UMS DB JSON **/
		umsConfig = { host: 'localhost', user: 'root', password: '', database: 'bijib_ums'}
		/** MT DB JSON **/
		mtConfig = { host: 'localhost', user: 'root', password: '', database: 'bijib_ums' }
		break;
}
global.ums = umsConfig
global.mt = mtConfig
global.server_cert_config = certificateOptions
global.basic_auth = { "admin": "admin" }