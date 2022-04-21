/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/customer-api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/customer-api/src/app/app.service.ts");
const Message_1 = __webpack_require__("./apps/customer-api/src/app/domain/Message.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    message(message) {
        return this.appService.pushNewMessage(message);
    }
    getMessage() {
        return this.appService.getAllMessage();
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Message_1.Messaging !== "undefined" && Message_1.Messaging) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "message", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getMessage", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)('message'),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/customer-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("@nestjs/axios");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/customer-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/customer-api/src/app/app.service.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 10000,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/customer-api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("@nestjs/axios");
const common_1 = __webpack_require__("@nestjs/common");
const tokenizers_1 = __webpack_require__("tokenizers");
const util_1 = __webpack_require__("util");
const rxjs_1 = __webpack_require__("rxjs");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.messaging = [];
        this.logger = new common_1.Logger();
    }
    getAllMessage() {
        return this.messaging;
    }
    pushNewMessage(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenizer = yield tokenizers_1.BertWordPieceTokenizer.fromOptions({
                vocabFile: './vocabulary.txt',
            });
            const encode = (0, util_1.promisify)(tokenizer.encode.bind(tokenizer));
            const token = yield encode(message.message);
            const attention_mask = token.getAttentionMask();
            const input_ids = token.getIds();
            const data = {
                instances: [
                    {
                        input_ids: input_ids,
                        attention_mask: attention_mask,
                    },
                ],
            };
            while (attention_mask.length < 256) {
                attention_mask.push(0);
                input_ids.push(0);
            }
            this.logger.log('Json Data :', JSON.stringify(data));
            const responseData = yield (0, rxjs_1.lastValueFrom)(this.httpService
                .post(`http://${process.env.SENTIMENT_MODEL_URL}`, JSON.stringify(data))
                .pipe((0, rxjs_1.map)((response) => {
                this.logger.log('Response status from tensorflow serving :', response.data);
                return response.data;
            })));
            let category = '';
            const max = Math.max(...responseData.predictions);
            const index = yield responseData.predictions.indexOf(max);
            if (index == 1) {
                category = 'hate speech';
            }
            else if (index === 2) {
                category = 'abusive';
            }
            else {
                category = 'normal';
            }
            this.messaging.push({
                message: message.category,
                prediction: responseData.predictions,
                category: category,
            });
        });
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/customer-api/src/app/domain/Message.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/axios":
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/platform-fastify":
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "tokenizers":
/***/ ((module) => {

module.exports = require("tokenizers");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "util":
/***/ ((module) => {

module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const platform_fastify_1 = __webpack_require__("@nestjs/platform-fastify");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/customer-api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
            logger: true,
        }));
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, '0.0.0.0');
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map