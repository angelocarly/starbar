import { IsDefined, IsNotEmpty, Min } from "class-validator";

export class CreateConsumptionRequest
{
	@IsDefined()
	public categoryId?: number;

	@IsNotEmpty()
	public name?: string;

	@IsDefined()
    @Min(0)
	public price?: number;
}
