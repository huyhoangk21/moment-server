"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Moment_1 = require("./Moment");
let Like = class Like extends typeorm_1.BaseEntity {
    constructor(like) {
        super();
        Object.assign(this, like);
    }
    toJSON() {
        return class_transformer_1.classToPlain(this);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Like.prototype, "like_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.likes, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Like.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Moment_1.Moment, moment => moment.likes, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'moment_id' }),
    __metadata("design:type", Moment_1.Moment)
], Like.prototype, "moment", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Like.prototype, "created_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Like.prototype, "updated_at", void 0);
Like = __decorate([
    typeorm_1.Entity({ name: 'likes' }),
    __metadata("design:paramtypes", [Object])
], Like);
exports.Like = Like;
//# sourceMappingURL=Like.js.map