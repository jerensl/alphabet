/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/customer-api/src/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const message_module_1 = __webpack_require__("./apps/customer-api/src/message/message.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [message_module_1.MessageModule],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/customer-api/src/database/prisma.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_service_1 = __webpack_require__("./apps/customer-api/src/database/prisma.service.ts");
let PrismaModule = class PrismaModule {
};
PrismaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);
exports.PrismaModule = PrismaModule;


/***/ }),

/***/ "./apps/customer-api/src/database/prisma.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const client_1 = __webpack_require__("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
    enableShutdownHooks(app) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.$on('beforeExit', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield app.close();
            }));
        });
    }
};
PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);
exports.PrismaService = PrismaService;


/***/ }),

/***/ "./apps/customer-api/src/message/message.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const message_service_1 = __webpack_require__("./apps/customer-api/src/message/message.service.ts");
const message_entity_1 = __webpack_require__("./apps/customer-api/src/message/message.entity.ts");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    message(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dataEncoded = yield this.messageService.encoded(message.message);
            const dataPrediction = yield this.messageService.prediction(dataEncoded);
            const category = this.messageService.getCategory(dataPrediction.predictions[0]);
            return this.messageService.addMessage({
                data: {
                    user_id: message.user_id,
                    message: message.message,
                    category: category,
                    normal: dataPrediction.predictions[0][0],
                    hate_speech: dataPrediction.predictions[0][1],
                    abusive: dataPrediction.predictions[0][2],
                },
            });
        });
    }
    getMessageByID(user_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.messageService.getMessageByID({
                where: {
                    user_id: user_id,
                },
            });
        });
    }
    getMessage() {
        return this.messageService.getAllMessage();
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof message_entity_1.MessageDTO !== "undefined" && message_entity_1.MessageDTO) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MessageController.prototype, "message", null);
tslib_1.__decorate([
    (0, common_1.Get)('user/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MessageController.prototype, "getMessageByID", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MessageController.prototype, "getMessage", null);
MessageController = tslib_1.__decorate([
    (0, common_1.Controller)('message'),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof message_service_1.MessageService !== "undefined" && message_service_1.MessageService) === "function" ? _e : Object])
], MessageController);
exports.MessageController = MessageController;


/***/ }),

/***/ "./apps/customer-api/src/message/message.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class MessageDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MessageDTO.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], MessageDTO.prototype, "message", void 0);
exports.MessageDTO = MessageDTO;


/***/ }),

/***/ "./apps/customer-api/src/message/message.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var MessageModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("@nestjs/axios");
const common_1 = __webpack_require__("@nestjs/common");
const message_controller_1 = __webpack_require__("./apps/customer-api/src/message/message.controller.ts");
const message_service_1 = __webpack_require__("./apps/customer-api/src/message/message.service.ts");
const prisma_module_1 = __webpack_require__("./apps/customer-api/src/database/prisma.module.ts");
let MessageModule = MessageModule_1 = class MessageModule {
};
MessageModule = MessageModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.registerAsync({
                useFactory: () => ({
                    timeout: 10000,
                    maxRedirects: 5,
                }),
            }),
            MessageModule_1,
            prisma_module_1.PrismaModule,
        ],
        controllers: [message_controller_1.MessageController],
        providers: [message_service_1.MessageService],
    })
], MessageModule);
exports.MessageModule = MessageModule;


/***/ }),

/***/ "./apps/customer-api/src/message/message.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageService = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("@nestjs/axios");
const common_1 = __webpack_require__("@nestjs/common");
const tokenizers_1 = __webpack_require__("tokenizers");
const util_1 = __webpack_require__("util");
const rxjs_1 = __webpack_require__("rxjs");
const prisma_service_1 = __webpack_require__("./apps/customer-api/src/database/prisma.service.ts");
let MessageService = class MessageService {
    constructor(httpService, prisma) {
        this.httpService = httpService;
        this.prisma = prisma;
    }
    getAllMessage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.message.findMany({});
        });
    }
    getMessageByID(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { where } = params;
            return this.prisma.message.findMany({
                where,
            });
        });
    }
    encoded(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenizer = yield tokenizers_1.BertWordPieceTokenizer.fromOptions({
                vocabFile: './vocabulary.txt',
            });
            const encode = (0, util_1.promisify)(tokenizer.encode.bind(tokenizer));
            const token = yield encode(message);
            const input_ids = token.getIds();
            const attention_mask = token.getAttentionMask();
            while (input_ids.length < 256) {
                attention_mask.push(0);
                input_ids.push(0);
            }
            const data = {
                instances: [
                    {
                        input_ids: input_ids,
                        attention_mask: attention_mask,
                    },
                ],
            };
            return data;
        });
    }
    prediction(dataEncoded) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const responseData = yield (0, rxjs_1.lastValueFrom)(this.httpService
                .post(process.env.SENTIMENT_MODEL_URL, JSON.stringify(dataEncoded))
                .pipe((0, rxjs_1.map)((response) => {
                return response.data;
            })));
            return responseData;
        });
    }
    getCategory(prediction) {
        const max = Math.max(...prediction);
        const index = prediction.indexOf(max);
        if (index === 1) {
            return 'hate speech';
        }
        else if (index === 2) {
            return 'abusive';
        }
        return 'normal';
    }
    addMessage(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = params;
            return this.prisma.message.create({
                data,
            });
        });
    }
};
MessageService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], MessageService);
exports.MessageService = MessageService;


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

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

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
const prisma_service_1 = __webpack_require__("./apps/customer-api/src/database/prisma.service.ts");
const app_module_1 = __webpack_require__("./apps/customer-api/src/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
            logger: true,
        }));
        const prismaService = app.get(prisma_service_1.PrismaService);
        yield prismaService.enableShutdownHooks(app);
        app.useGlobalPipes(new common_1.ValidationPipe());
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, '0.0.0.0');
        common_1.Logger.log(`???? Application is running on: http://localhost:${port}/${globalPrefix}`);
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