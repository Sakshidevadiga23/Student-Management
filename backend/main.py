from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import schemas, crud, models
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import Request


Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()

    # get first validation error
    first_error = errors[0]
    field = first_error["loc"][-1]
    message = first_error["msg"]

    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": f"{field} - {message}"
        }
    )


@app.get("/")
def root():
    return {"message": "Student Management API is running"}

@app.get("/favicon.ico")
def favicon():
    return {}

# CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/students")
def read_students(db: Session = Depends(get_db)):
    return crud.get_students(db)


@app.post("/students")
def add_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db, student)


@app.delete("/students/{student_id}")
def remove_student(student_id: int, db: Session = Depends(get_db)):
    return crud.delete_student(db, student_id)
