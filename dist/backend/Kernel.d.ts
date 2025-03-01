/// <reference types="dist" />
import { Type } from "../frontend/Type";
import { DepthTexture, TextureBase } from "../data/Texture";
import { Field } from "../data/Field";
declare enum ResourceType {
    Root = 0,
    RootAtomic = 1,
    GlobalTmps = 2,
    Args = 3,
    RandStates = 4,
    Rets = 5,
    Texture = 6,
    Sampler = 7
}
declare class ResourceBinding {
    resourceType: ResourceType;
    resourceID: number | null;
    binding: number;
    constructor(resourceType: ResourceType, resourceID: number | null, binding: number);
    equals(that: ResourceBinding): boolean;
}
declare class TaskParams {
    code: string;
    rangeHint: string;
    workgroupSize: number;
    bindings: ResourceBinding[];
    constructor(code: string, rangeHint: string, workgroupSize: number, bindings?: ResourceBinding[]);
}
declare class VertexShaderParams {
    code: string;
    bindings: ResourceBinding[];
    constructor(code?: string, bindings?: ResourceBinding[]);
}
declare class FragmentShaderParams {
    code: string;
    bindings: ResourceBinding[];
    constructor(code?: string, bindings?: ResourceBinding[]);
}
declare class RenderPipelineParams {
    vertex: VertexShaderParams;
    fragment: FragmentShaderParams;
    interpolatedType: Type;
    vertexBuffer: Field | null;
    indexBuffer: Field | null;
    indirectBuffer: Field | null;
    constructor(vertex: VertexShaderParams, fragment: FragmentShaderParams, interpolatedType?: Type, vertexBuffer?: Field | null, indexBuffer?: Field | null, indirectBuffer?: Field | null);
    bindings: ResourceBinding[];
    indirectCount: number | Field;
    getBindings(): ResourceBinding[];
}
interface ColorAttachment {
    texture: TextureBase;
    clearColor?: number[];
}
interface DepthAttachment {
    texture: DepthTexture;
    clearDepth?: number;
    storeDepth?: boolean;
}
interface RenderPassParams {
    colorAttachments: ColorAttachment[];
    depthAttachment: DepthAttachment | null;
}
declare class KernelParams {
    tasksParams: (TaskParams | RenderPipelineParams)[];
    argTypes: Type[];
    returnType: Type;
    renderPassParams: RenderPassParams | null;
    constructor(tasksParams: (TaskParams | RenderPipelineParams)[], argTypes: Type[], returnType: Type, renderPassParams?: RenderPassParams | null);
}
declare class CompiledTask {
    params: TaskParams;
    pipeline: GPUComputePipeline | null;
    bindGroup: GPUBindGroup | null;
    constructor(params: TaskParams, device: GPUDevice);
    createPipeline(device: GPUDevice): void;
}
declare class CompiledRenderPipeline {
    params: RenderPipelineParams;
    pipeline: GPURenderPipeline | null;
    bindGroup: GPUBindGroup | null;
    constructor(params: RenderPipelineParams, renderPassParams: RenderPassParams, device: GPUDevice);
    private getGPUVertexBufferStates;
    private getGPUColorTargetStates;
    getVertexCount(): number;
    createPipeline(device: GPUDevice, renderPassParams: RenderPassParams): void;
}
declare class CompiledRenderPassInfo {
    params: RenderPassParams;
    constructor(params: RenderPassParams);
    getGPURenderPassDescriptor(): GPURenderPassDescriptor;
}
declare class CompiledKernel {
    tasks: (CompiledTask | CompiledRenderPipeline)[];
    argTypes: Type[];
    returnType: Type;
    renderPassInfo: CompiledRenderPassInfo | null;
    constructor(tasks?: (CompiledTask | CompiledRenderPipeline)[], argTypes?: Type[], returnType?: Type, renderPassInfo?: CompiledRenderPassInfo | null);
}
export { CompiledTask, CompiledKernel, TaskParams, ResourceType, ResourceBinding, KernelParams, VertexShaderParams, FragmentShaderParams, RenderPipelineParams, CompiledRenderPipeline, RenderPassParams, ColorAttachment, DepthAttachment, CompiledRenderPassInfo };
