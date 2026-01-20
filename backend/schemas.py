from pydantic import BaseModel, Field, ConfigDict, field_validator
import re

class StudentBase(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    email: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value):
        pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        if not re.match(pattern, value):
            raise ValueError("Invalid email format")
        return value


class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)