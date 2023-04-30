const customCss = `
.swagger-ui .topbar {
	/*background-color: #FCC419;
	padding: 10px 0;*/
    display: none;
}
/* ----------
~ GENERAL STYLES ~
-------------*/

body {
    background-color: white;
    background-image: none !important;
    font-family: 'Montserrat', sans-serif;
}

/* ----------
~ FONTS ~
-------------*/
.swagger-ui .info .title {
	font-family: 'Montserrat', sans-serif;
}
.swagger-ui * {
	font-family: 'Montserrat', sans-serif;
}

/* ----------
    ~ TAGS ~
-------------*/
.swagger-ui .opblock-tag {
	color: #3b4151;
	font-size: 24px;
	margin: 0 0 5px;
	background: #eeeaea;
	border-radius: 10px 10px 0 0;
}
.swagger-ui .opblock-tag-section {
	background: rgba(250,250,250,0.50);
	border-radius: 10px;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
}

/* ----------
~ ALL BLOCKS ~
-------------*/
.swagger-ui .opblock {
    box-shadow: 16px 12px 19px -3px rgba(0,0,0,0.1);
    margin: 0.3rem 0.8rem;
    
}
/* put the same style to all route blocks */
.swagger-ui .opblock:is(.opblock-get, .opblock-post, .opblock-put, .opblock-patch, .opblock-delete) {
    background: #fff;
	border-color: lightgrey;
}

/* ----------
~ GET ROUTES ~
-------------*/
.swagger-ui .opblock.opblock-get .opblock-summary-method {
	background: #f0f;
}
.swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span::after {
	background: #f0f;
}
/* ----------
~ SCHEMAS BLOCK ~
-------------*/
.swagger-ui section.models {
	padding: 0 0 20px;
	background-color: #eeeaea;
}
`;
module.exports = customCss;