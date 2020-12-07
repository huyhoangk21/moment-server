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
exports.Snapshot = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const Creator_1 = require("./Creator");
const Like_1 = require("./Like");
let Snapshot = class Snapshot extends typeorm_1.BaseEntity {
    constructor(snapshot) {
        super();
        Object.assign(this, snapshot);
    }
    toJSON() {
        return class_transformer_1.classToPlain(this);
    }
};
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Snapshot.prototype, "snapshot_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Creator_1.Creator, creator => creator.snapshots, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'creator_id' }),
    __metadata("design:type", Creator_1.Creator)
], Snapshot.prototype, "creator", void 0);
__decorate([
    typeorm_1.OneToMany(() => Like_1.Like, like => like.snapshot),
    __metadata("design:type", Array)
], Snapshot.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Snapshot.prototype, "selected_file", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Snapshot.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Snapshot.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Snapshot.prototype, "created_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Snapshot.prototype, "updated_at", void 0);
Snapshot = __decorate([
    typeorm_1.Entity({
        name: 'snapshots',
        orderBy: {
            created_at: 'DESC',
        },
    }),
    __metadata("design:paramtypes", [Object])
], Snapshot);
exports.Snapshot = Snapshot;
//# sourceMappingURL=Snapshot.js.map