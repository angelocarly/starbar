
import { IsDefined, Min } from "class-validator";

export class CreateConsumptionRequest
{
	@IsDefined()
	public categoryId: number | undefined;

	@IsDefined()
	public name: string | undefined;

	@IsDefined()
    @Min(0)
	public price: number | undefined;

}
