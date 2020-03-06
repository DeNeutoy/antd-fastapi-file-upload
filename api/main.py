from typing import List, Optional, Dict
import logging
import os
import json

from fastapi import FastAPI, File, UploadFile, Body
from starlette.middleware.cors import CORSMiddleware

logger = logging.getLogger("uvicorn")

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


@app.post("/train")
def upload_file(files: List[UploadFile] = File(...),
                email: str = Body(default=None),
                ):
    """
    """
    training_file, validation_file, test_file = map_files_to_datasets(files)

    return {
        "uid": task_id
    }
