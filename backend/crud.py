from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException, status

def get_students(db: Session):
    return db.query(models.Student).all()

def create_student(db: Session, student: schemas.StudentCreate):

    
    existing_student = db.query(models.Student)\
        .filter(models.Student.email == student.email)\
        .first()

    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student with this email already exists"
        )

    db_student = models.Student(
        name=student.name,
        email=student.email
    )

    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    return db_student

def delete_student(db: Session, student_id: int):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if student:
        db.delete(student)
        db.commit()
    return student

