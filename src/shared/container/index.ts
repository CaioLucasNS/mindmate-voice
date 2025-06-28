import "reflect-metadata"
import { container } from "tsyringe"
// import { IOpenAIApiProvider } from "@/core/protocols/IOpenAIApiProvider"
// import { OpenAIApiProvider } from "@/infra/openai/implementations/OpenAIApiProvider"
import { IOpenAIApiProvider } from '@/domain/protocols/IOpenAIApiProvider';
import { OpenAIApiProvider } from "@/infra/providers/openai/OpenAIApiProvider"


container.registerSingleton<IOpenAIApiProvider>("OpenAIApiProvider", OpenAIApiProvider)
