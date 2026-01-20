from pydantic import BaseModel, ConfigDict

class StudentBase(BaseModel):
    name: str
    email: str

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)