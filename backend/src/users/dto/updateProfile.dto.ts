import { PartialType } from "@nestjs/mapped-types";
import CreateProfileDto from "./createProfile.dto";

export default class UpdateProfileDto extends PartialType(CreateProfileDto){}