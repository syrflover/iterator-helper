import { sequence } from '../iterable/mod.ts';

import { fold } from '../../methods/mod.ts';

export function $<P, R1>(p: P | Promise<P>, f0: (p: P) => R1 | Promise<R1>): Promise<R1>;
export function $<P, R1, R2>(p: P | Promise<P>, f0: (p: P) => R1 | Promise<R1>, f1: (r0: R1) => R2 | Promise<R2>): Promise<R2>;
export function $<P, R1, R2, R3>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
): Promise<R3>;
export function $<P, R1, R2, R3, R4>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
): Promise<R4>;
export function $<P, R1, R2, R3, R4, R5>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
): Promise<R5>;
export function $<P, R1, R2, R3, R4, R5, R6>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
): Promise<R6>;
export function $<P, R1, R2, R3, R4, R5, R6, R7>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
): Promise<R7>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
): Promise<R8>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
): Promise<R9>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
): Promise<R10>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
): Promise<R11>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
): Promise<R12>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
): Promise<R13>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
): Promise<R14>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
    f14: (r13: R14) => R15 | Promise<R15>,
): Promise<R15>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
    f14: (r13: R14) => R15 | Promise<R15>,
    f15: (r14: R15) => R16 | Promise<R16>,
): Promise<R16>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
    f14: (r13: R14) => R15 | Promise<R15>,
    f15: (r14: R15) => R16 | Promise<R16>,
    f16: (r15: R16) => R17 | Promise<R17>,
): Promise<R17>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
    f14: (r13: R14) => R15 | Promise<R15>,
    f15: (r14: R15) => R16 | Promise<R16>,
    f16: (r15: R16) => R17 | Promise<R17>,
    f17: (r16: R17) => R18 | Promise<R18>,
): Promise<R18>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
    f14: (r13: R14) => R15 | Promise<R15>,
    f15: (r14: R15) => R16 | Promise<R16>,
    f16: (r15: R16) => R17 | Promise<R17>,
    f17: (r16: R17) => R18 | Promise<R18>,
    f18: (r17: R18) => R19 | Promise<R19>,
): Promise<R19>;
export function $<P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(
    p: P | Promise<P>,
    f0: (p: P) => R1 | Promise<R1>,
    f1: (r0: R1) => R2 | Promise<R2>,
    f2: (r1: R2) => R3 | Promise<R3>,
    f3: (r2: R3) => R4 | Promise<R4>,
    f4: (r3: R4) => R5 | Promise<R5>,
    f5: (r4: R5) => R6 | Promise<R6>,
    f6: (r5: R6) => R7 | Promise<R7>,
    f7: (r6: R7) => R8 | Promise<R8>,
    f8: (r7: R8) => R9 | Promise<R9>,
    f9: (r8: R9) => R10 | Promise<R10>,
    f10: (r9: R10) => R11 | Promise<R11>,
    f11: (r10: R11) => R12 | Promise<R12>,
    f12: (r11: R12) => R13 | Promise<R13>,
    f13: (r12: R13) => R14 | Promise<R14>,
    f14: (r13: R14) => R15 | Promise<R15>,
    f15: (r14: R15) => R16 | Promise<R16>,
    f16: (r15: R16) => R17 | Promise<R17>,
    f17: (r16: R17) => R18 | Promise<R18>,
    f18: (r17: R18) => R19 | Promise<R19>,
    f19: (r18: R19) => R20 | Promise<R20>,
): Promise<R20>;

export function $(p: any, ...fns: any[]) {
    return fold((acc: any, fn: any) => fn(acc), p, sequence(fns));
}
