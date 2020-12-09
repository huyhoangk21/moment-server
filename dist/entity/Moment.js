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
exports.Moment = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const User_1 = require("./User");
const Like_1 = require("./Like");
let Moment = class Moment extends typeorm_1.BaseEntity {
    constructor(moment) {
        super();
        Object.assign(this, moment);
    }
    toJSON() {
        return class_transformer_1.classToPlain(this);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Moment.prototype, "moment_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.moments, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Moment.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Like_1.Like, like => like.moment),
    __metadata("design:type", Array)
], Moment.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Moment.prototype, "selected_file", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Moment.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Moment.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Moment.prototype, "created_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Moment.prototype, "updated_at", void 0);
Moment = __decorate([
    typeorm_1.Entity({
        name: 'moments',
        orderBy: {
            created_at: 'DESC',
        },
    }),
    __metadata("design:paramtypes", [Object])
], Moment);
exports.Moment = Moment;
//# sourceMappingURL=Moment.js.map