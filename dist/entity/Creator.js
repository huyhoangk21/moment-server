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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creator = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Snapshot_1 = require("./Snapshot");
const Like_1 = require("./Like");
let Creator = class Creator extends typeorm_1.BaseEntity {
    constructor(creator) {
        super();
        Object.assign(this, creator);
    }
    async hashPassword() {
        const salt = await bcryptjs_1.default.genSalt(12);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
    }
    toJSON() {
        return class_transformer_1.classToPlain(this);
    }
    async matchPassword(password) {
        return await bcryptjs_1.default.compare(password, this.password);
    }
};
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Creator.prototype, "creator_id", void 0);
__decorate([
    class_validator_1.MaxLength(20, {
        message: 'Creator name must not be more than 20 characters',
    }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Creator.prototype, "creator_name", void 0);
__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsEmail(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Creator.prototype, "email", void 0);
__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.MinLength(6, { message: 'Password must be at least 6 characters' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Creator.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(() => Snapshot_1.Snapshot, snapshot => snapshot.creator),
    __metadata("design:type", Array)
], Creator.prototype, "snapshots", void 0);
__decorate([
    typeorm_1.OneToMany(() => Like_1.Like, like => like.creator),
    __metadata("design:type", Array)
], Creator.prototype, "likes", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Creator.prototype, "created_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Creator.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Creator.prototype, "hashPassword", null);
Creator = __decorate([
    typeorm_1.Entity({ name: 'creators' }),
    __metadata("design:paramtypes", [Object])
], Creator);
exports.Creator = Creator;
//# sourceMappingURL=Creator.js.map