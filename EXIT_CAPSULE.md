# Dependency Exit Capsule: jarvis_check
**Generated Timestamp:** 2026-10-15T09:17:50.239617+00:00
**Python Runtime Environment:** 3.13.4 (tags/v3.13.4:8a526ec, Jun  3 2025, 17:46:04) [MSC v.1943 64 bit (AMD64)]

---

## 1. Maintenance Problem & At-Risk Dependencies [VERIFIED OBSERVATION]
*Data extracted directly from repository manifests and live PyPI API metadata.*

### pygame
*   **Current / Latest Version:** `2.6.1`
*   **Last PyPI Release Date:** `2024-09-29` (`745` days ago)
*   **Python Version Constraint:** `>=3.6`
*   **Observed Risk Indicators:**
    *   No release in 745 days (Last: 2024-09-29)
    *   Marked Inactive in PyPI classifiers

### html2text
*   **Current / Latest Version:** `2025.4.15`
*   **Last PyPI Release Date:** `2025-04-15` (`548` days ago)
*   **Python Version Constraint:** `>=3.9`
*   **Observed Risk Indicators:**
    *   No release in 548 days (Last: 2025-04-15)

### Pillow
*   **Current / Latest Version:** `12.3.0`
*   **Last PyPI Release Date:** `2026-07-01` (`105` days ago)
*   **Python Version Constraint:** `>=3.10`
*   **Observed Risk Indicators:**
    *   Marked Inactive in PyPI classifiers

### webrtcvad
*   **Current / Latest Version:** `2.0.10`
*   **Last PyPI Release Date:** `2017-01-07` (`3567` days ago)
*   **Python Version Constraint:** ``
*   **Observed Risk Indicators:**
    *   No release in 3567 days (Last: 2017-01-07)
    *   Missing explicit Python version constraints (requires_python)

### pytesseract
*   **Current / Latest Version:** `0.3.13`
*   **Last PyPI Release Date:** `2024-08-16` (`790` days ago)
*   **Python Version Constraint:** `>=3.8`
*   **Observed Risk Indicators:**
    *   No release in 790 days (Last: 2024-08-16)

### pyinstaller
*   **Current / Latest Version:** `6.22.3`
*   **Last PyPI Release Date:** `2026-09-12` (`32` days ago)
*   **Python Version Constraint:** `<3.16,>=3.8`
*   **Observed Risk Indicators:**
    *   Marked Inactive in PyPI classifiers

### mlx-whisper
*   **Current / Latest Version:** `0.4.3`
*   **Last PyPI Release Date:** `2025-08-29` (`411` days ago)
*   **Python Version Constraint:** `>=3.8`
*   **Observed Risk Indicators:**
    *   No release in 411 days (Last: 2025-08-29)

### pynput
*   **Current / Latest Version:** `1.8.2`
*   **Last PyPI Release Date:** `2026-05-12` (`155` days ago)
*   **Python Version Constraint:** `None`
*   **Observed Risk Indicators:**
    *   Missing explicit Python version constraints (requires_python)

### pytest
*   **Current / Latest Version:** `9.1.1`
*   **Last PyPI Release Date:** `2026-06-19` (`117` days ago)
*   **Python Version Constraint:** `>=3.10`
*   **Observed Risk Indicators:**
    *   Marked Inactive in PyPI classifiers

### pytest-repeat
*   **Current / Latest Version:** `0.9.4`
*   **Last PyPI Release Date:** `2025-04-07` (`555` days ago)
*   **Python Version Constraint:** `>=3.9`
*   **Observed Risk Indicators:**
    *   No release in 555 days (Last: 2025-04-07)

### miniupnpc
*   **Current / Latest Version:** `2.3.3`
*   **Last PyPI Release Date:** `2025-05-26` (`506` days ago)
*   **Python Version Constraint:** `None`
*   **Observed Risk Indicators:**
    *   No release in 506 days (Last: 2025-05-26)
    *   Missing explicit Python version constraints (requires_python)

## 2. Repository Usage Locations [VERIFIED OBSERVATION]
*Static AST analysis of exact import statements and usage footprints across the codebase.*

### pygame
    *   `src\jarvis\output\tts.py:Line 556` — `import pygame`

### sounddevice
    *   `src\desktop_app\settings_window.py:Line 397` — `import sounddevice`
    *   `src\jarvis\dictation\dictation_engine.py:Line 32` — `import sounddevice`
    *   `src\jarvis\listening\listener.py:Line 97` — `import sounddevice`
    *   `src\jarvis\output\tts.py:Line 873` — `import sounddevice`
    *   `src\jarvis\output\tune_player.py:Line 171` — `import sounddevice`
    *   `tests\conftest.py:Line 342` — `import sounddevice`
    *   `tests\test_dictation.py:Line 150` — `import sounddevice`

### faster-whisper
    *   `evals\test_local_whisper_runtime.py:Line 51` — `from faster_whisper import WhisperModel`
    *   `evals\test_local_whisper_runtime.py:Line 71` — `from faster_whisper.vad import get_speech_timestamps`
    *   `evals\test_local_whisper_runtime.py:Line 79` — `from faster_whisper.vad import get_speech_timestamps`
    *   `src\jarvis\listening\listener.py:Line 310` — `from faster_whisper import WhisperModel`
    *   `src\jarvis\listening\model_download.py:Line 181` — `from faster_whisper.utils import download_model`
    *   `src\jarvis\listening\model_download.py:Line 105` — `from faster_whisper.utils import download_model`
    *   `src\jarvis\listening\whisper_capabilities.py:Line 9` — `import faster_whisper`
    *   `tests\test_whisper_pre_download.py:Line 46` — `import faster_whisper.utils`
    *   `tests\test_whisper_pre_download.py:Line 55` — `import faster_whisper.utils`
    *   `tests\test_whisper_pre_download.py:Line 170` — `import faster_whisper.utils`
    *   `tests\test_whisper_pre_download.py:Line 292` — `from faster_whisper.utils import _MODELS`
    *   `tests\fixtures\faster_whisper_bundle_probe.py:Line 3` — `from faster_whisper import available_models`
    *   `tests\fixtures\faster_whisper_bundle_probe.py:Line 4` — `from faster_whisper.vad import get_speech_timestamps`

### webrtcvad
    *   `src\jarvis\listening\listener.py:Line 118` — `import webrtcvad`

### pytesseract
    *   `src\jarvis\tools\builtin\screenshot.py:Line 51` — `import pytesseract`

### pyinstaller
    *   `installer\mlx_bundle.py:Line 12` — `from PyInstaller.utils.hooks import collect_data_files, collect_dynamic_libs, collect_submodules`
    *   `installer\hooks\hook-curl_cffi.py:Line 2` — `from PyInstaller.utils.hooks import collect_all`
    *   `installer\hooks\hook-faster_whisper.py:Line 2` — `from PyInstaller.utils.hooks import collect_data_files`

### mcp
    *   `src\jarvis\tools\external\mcp_client.py:Line 9` — `from mcp import ClientSession`
    *   `src\jarvis\tools\external\mcp_client.py:Line 10` — `from mcp.client.stdio import stdio_client, StdioServerParameters`
    *   `tests\test_mcp_client.py:Line 650` — `from mcp.types import TextContent`
    *   `tests\test_mcp_client.py:Line 657` — `from mcp.types import TextContent`
    *   `tests\test_mcp_client.py:Line 677` — `from mcp.types import TextContent`

### mlx-whisper
    *   `evals\test_whisper_audio_evidence.py:Line 103` — `import mlx_whisper`
    *   `src\desktop_app\setup_wizard.py:Line 64` — `import mlx_whisper`
    *   `src\jarvis\dictation\dictation_engine.py:Line 1190` — `import mlx_whisper`
    *   `src\jarvis\listening\listener.py:Line 301` — `import mlx_whisper`
    *   `tests\fixtures\mlx_bundle_probe.py:Line 2` — `import mlx_whisper`
    *   `tests\fixtures\mlx_bundle_probe.py:Line 4` — `from mlx_whisper.tokenizer import get_tokenizer`
    *   `tests\fixtures\mlx_bundle_probe.py:Line 5` — `from mlx_whisper.timing import dtw_cpu`

### urllib3
    *   `src\jarvis\listening\model_download.py:Line 54` — `from urllib3.exceptions import NewConnectionError, ProtocolError, SSLError, TimeoutError`
    *   `src\jarvis\llm\errors.py:Line 4` — `from urllib3.exceptions import ReadTimeoutError`
    *   `tests\test_llm_timeout_diagnostics.py:Line 8` — `from urllib3.exceptions import ReadTimeoutError`
    *   `tests\test_llm_timeout_diagnostics.py:Line 72` — `from urllib3.exceptions import NewConnectionError`
    *   `tests\test_whisper_network_failures.py:Line 8` — `from urllib3.exceptions import MaxRetryError, ProtocolError, SSLError`

### filelock
    *   `src\jarvis\dictation\history.py:Line 19` — `from filelock import FileLock`
    *   `tests\test_dictation_history.py:Line 429` — `from filelock import FileLock`
    *   `tests\test_dictation_history.py:Line 310` — `from filelock import FileLock`
    *   `tests\test_dictation_history_writers.py:Line 69` — `from filelock import FileLock`

### flask
    *   `src\desktop_app\memory_viewer.py:Line 16` — `from flask import Flask, jsonify, request, Response`
    *   `tests\test_diary_import.py:Line 91` — `import flask`
    *   `tests\test_memory_viewer_diary_optimise_api.py:Line 23` — `import flask`
    *   `tests\test_memory_viewer_diary_scrub_api.py:Line 23` — `import flask`
    *   `tests\test_memory_viewer_graph_api.py:Line 8` — `import flask`

### pynput
    *   `src\jarvis\dictation\dictation_engine.py:Line 42` — `from pynput import keyboard`
    *   `src\jarvis\dictation\dictation_engine.py:Line 52` — `from pynput._util.darwin import ListenerMixin`
    *   `tests\test_dictation.py:Line 526` — `from pynput import keyboard`
    *   `tests\test_dictation.py:Line 538` — `from pynput import keyboard`
    *   `tests\test_dictation.py:Line 149` — `import pynput`
    *   `tests\fixtures\macos_hotkey_probe.py:Line 4` — `from pynput import keyboard`
    *   `tests\fixtures\macos_hotkey_probe.py:Line 6` — `import pynput.keyboard._darwin`

### psutil
    *   `src\desktop_app\app.py:Line 32` — `import psutil`

### PyQt6
    *   `scripts\capture_face_preview.py:Line 20` — `from PyQt6.QtCore import Qt, QRectF`
    *   `scripts\capture_face_preview.py:Line 21` — `from PyQt6.QtGui import QColor, QFont, QImage, QPainter`
    *   `scripts\capture_face_preview.py:Line 22` — `from PyQt6.QtWidgets import QApplication`
    *   `scripts\capture_readme_screenshots.py:Line 23` — `from PyQt6.QtWidgets import QApplication`
    *   `scripts\capture_readme_screenshots.py:Line 24` — `from PyQt6.QtTest import QTest`
    *   `src\desktop_app\app.py:Line 44` — `from PyQt6.QtWidgets import QApplication, QSystemTrayIcon, QMenu, QMainWindow, QTextEdit, QVBoxLayout, QHBoxLayout, QWidget, QLabel, QDialog, QPushButton, QProgressBar, QScrollArea, QFrame`
    *   `src\desktop_app\app.py:Line 45` — `from PyQt6.QtGui import QIcon, QAction, QFont, QTextCursor, QTextCharFormat, QColor`
    *   `src\desktop_app\app.py:Line 46` — `from PyQt6.QtCore import QTimer, Qt, pyqtSignal, QObject, QThread, QUrl`
    *   `src\desktop_app\app.py:Line 60` — `from PyQt6.QtWebEngineWidgets import QWebEngineView`
    *   `src\desktop_app\app.py:Line 1049` — `from PyQt6.QtWidgets import QMessageBox`
    *   `src\desktop_app\app.py:Line 1050` — `from PyQt6.QtGui import QIcon`
    *   `src\desktop_app\app.py:Line 3141` — `from PyQt6.QtWidgets import QMessageBox`
    *   `src\desktop_app\app.py:Line 737` — `from PyQt6.QtWidgets import QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QTextEdit, QCheckBox`
    *   `src\desktop_app\app.py:Line 741` — `from PyQt6.QtCore import Qt`
    *   `src\desktop_app\app.py:Line 2023` — `from PyQt6.QtWidgets import QMessageBox`
    *   `src\desktop_app\app.py:Line 2064` — `from PyQt6.QtWidgets import QWizard`
    *   `src\desktop_app\app.py:Line 2089` — `from PyQt6.QtWidgets import QMessageBox`
    *   `src\desktop_app\app.py:Line 3217` — `from PyQt6.QtWidgets import QApplication`
    *   `src\desktop_app\app.py:Line 3339` — `from PyQt6.QtWidgets import QApplication`
    *   `src\desktop_app\app.py:Line 3407` — `from PyQt6.QtWidgets import QApplication`
    *   `src\desktop_app\app.py:Line 3408` — `from PyQt6.QtCore import QTimer`
    *   `src\desktop_app\app.py:Line 3446` — `from PyQt6.QtCore import QEventLoop`
    *   `src\desktop_app\app.py:Line 1653` — `from PyQt6.QtWidgets import QMessageBox`
    *   `src\desktop_app\app.py:Line 2371` — `from PyQt6.QtGui import QPixmap, QPainter, QColor, QFont`
    *   `src\desktop_app\app.py:Line 3774` — `from PyQt6.QtWidgets import QSystemTrayIcon`
    *   `src\desktop_app\app.py:Line 2161` — `from PyQt6.QtWidgets import QMessageBox`
    *   `src\desktop_app\app.py:Line 3791` — `from PyQt6.QtWidgets import QApplication, QMessageBox`
    *   `src\desktop_app\chat_window.py:Line 23` — `from PyQt6.QtCore import Qt, QTimer, pyqtSignal, QObject, QRectF`
    *   `src\desktop_app\chat_window.py:Line 24` — `from PyQt6.QtGui import QCloseEvent, QShowEvent, QPainter, QColor, QPen, QLinearGradient, QRadialGradient, QShortcut, QKeySequence`
    *   `src\desktop_app\chat_window.py:Line 28` — `from PyQt6.QtWidgets import QHBoxLayout, QLayout, QLabel, QMainWindow, QPlainTextEdit, QPushButton, QScrollArea, QVBoxLayout, QWidget, QSizeGrip`
    *   `src\desktop_app\chat_window.py:Line 946` — `from PyQt6.QtGui import QKeyEvent`
    *   `src\desktop_app\chat_window.py:Line 947` — `from PyQt6.QtCore import Qt`
    *   `src\desktop_app\diary_dialog.py:Line 5` — `from PyQt6.QtWidgets import QDialog, QVBoxLayout, QLabel, QTextEdit, QProgressBar, QFrame`
    *   `src\desktop_app\diary_dialog.py:Line 8` — `from PyQt6.QtCore import Qt, pyqtSignal, QObject`
    *   `src\desktop_app\diary_dialog.py:Line 9` — `from PyQt6.QtGui import QFont`
    *   `src\desktop_app\dictation_history.py:Line 14` — `from PyQt6.QtWidgets import QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QScrollArea, QFrame, QApplication, QMessageBox`
    *   `src\desktop_app\dictation_history.py:Line 19` — `from PyQt6.QtCore import Qt, pyqtSignal, QObject, QTimer`
    *   `src\desktop_app\dictation_history.py:Line 20` — `from PyQt6.QtGui import QFont`
    *   `src\desktop_app\face_widget.py:Line 10` — `from PyQt6.QtWidgets import QWidget, QVBoxLayout, QApplication, QMenu`
    *   `src\desktop_app\face_widget.py:Line 11` — `from PyQt6.QtGui import QPainter, QPen, QColor, QPainterPath, QPainterPathStroker, QRadialGradient, QRegion`
    *   `src\desktop_app\face_widget.py:Line 12` — `from PyQt6.QtCore import Qt, QTimer, QPointF, pyqtSignal, QObject`
    *   `src\desktop_app\issue_report.py:Line 9` — `from PyQt6.QtWidgets import QApplication, QCheckBox, QDialog, QHBoxLayout, QLabel, QLineEdit, QPlainTextEdit, QPushButton, QScrollArea, QStackedWidget, QTextBrowser, QVBoxLayout, QWidget`
    *   `src\desktop_app\qt_worker.py:Line 22` — `from PyQt6.QtCore import QThread`
    *   `src\desktop_app\settings_window.py:Line 15` — `from PyQt6.QtWidgets import QDialog, QVBoxLayout, QHBoxLayout, QWidget, QLabel, QLineEdit, QSpinBox, QDoubleSpinBox, QCheckBox, QComboBox, QScrollArea, QGroupBox, QFormLayout, QPushButton, QMessageBox, QSizePolicy, QListWidget, QListWidgetItem, QStackedWidget, QSplitter, QInputDialog, QFrame`
    *   `src\desktop_app\settings_window.py:Line 22` — `from PyQt6.QtCore import Qt, QSize`
    *   `src\desktop_app\settings_window.py:Line 23` — `from PyQt6.QtGui import QFont`
    *   `src\desktop_app\setup_wizard.py:Line 370` — `from PyQt6.QtWidgets import QApplication, QWizard, QWizardPage, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QProgressBar, QTextEdit, QWidget, QFrame, QSizePolicy, QScrollArea, QLineEdit, QSlider, QComboBox, QCheckBox, QDoubleSpinBox, QRadioButton, QButtonGroup, QStackedWidget, QLayout, QBoxLayout`
    *   `src\desktop_app\setup_wizard.py:Line 377` — `from PyQt6.QtCore import Qt, QTimer, pyqtSignal, QThread, QObject`
    *   `src\desktop_app\setup_wizard.py:Line 378` — `from PyQt6.QtGui import QFont, QColor, QPalette, QPixmap, QPainter`
    *   `src\desktop_app\splash_screen.py:Line 10` — `from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel, QApplication`
    *   `src\desktop_app\splash_screen.py:Line 11` — `from PyQt6.QtGui import QPainter, QPen, QColor, QBrush, QRadialGradient, QFont`
    *   `src\desktop_app\splash_screen.py:Line 12` — `from PyQt6.QtCore import Qt, QTimer, QRectF, pyqtSignal`
    *   `src\desktop_app\updater.py:Line 23` — `from PyQt6.QtCore import QObject, pyqtSignal`
    *   `src\desktop_app\update_dialog.py:Line 15` — `from PyQt6.QtCore import Qt, QTimer`
    *   `src\desktop_app\update_dialog.py:Line 16` — `from PyQt6.QtGui import QCursor`
    *   `src\desktop_app\update_dialog.py:Line 17` — `from PyQt6.QtWidgets import QDialog, QFrame, QHBoxLayout, QLabel, QMessageBox, QProgressBar, QPushButton, QScrollArea, QSizePolicy, QVBoxLayout, QWidget`
    *   `src\desktop_app\update_dialog.py:Line 609` — `from PyQt6.QtWidgets import QApplication`
    *   `tests\conftest.py:Line 186` — `from PyQt6.QtWidgets import QApplication`
    *   `tests\conftest.py:Line 197` — `from PyQt6 import sip`
    *   `tests\conftest.py:Line 198` — `from PyQt6.QtCore import QCoreApplication, QEvent`
    *   `tests\test_chat_window.py:Line 26` — `from PyQt6.QtCore import Qt, QPoint`
    *   `tests\test_chat_window.py:Line 27` — `from PyQt6.QtTest import QTest`
    *   `tests\test_chat_window.py:Line 28` — `from PyQt6.QtWidgets import QSizeGrip`
    *   `tests\test_chat_window.py:Line 49` — `from PyQt6.QtCore import Qt`
    *   `tests\test_chat_window.py:Line 75` — `from PyQt6.QtCore import Qt`
    *   `tests\test_chat_window.py:Line 76` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_chat_window.py:Line 77` — `from PyQt6.QtTest import QTest`
    *   `tests\test_chat_window.py:Line 298` — `from PyQt6.QtGui import QCloseEvent`
    *   `tests\test_chat_window.py:Line 612` — `from PyQt6.QtCore import Qt, QEvent`
    *   `tests\test_chat_window.py:Line 613` — `from PyQt6.QtGui import QKeyEvent`
    *   `tests\test_chat_window.py:Line 634` — `from PyQt6.QtCore import Qt, QEvent`
    *   `tests\test_chat_window.py:Line 635` — `from PyQt6.QtGui import QKeyEvent`
    *   `tests\test_chat_window.py:Line 654` — `from PyQt6.QtCore import Qt, QEvent`
    *   `tests\test_chat_window.py:Line 655` — `from PyQt6.QtGui import QKeyEvent`
    *   `tests\test_chat_window.py:Line 682` — `from PyQt6.QtTest import QTest`
    *   `tests\test_chat_window.py:Line 713` — `from PyQt6.QtGui import QCloseEvent`
    *   `tests\test_chat_window.py:Line 817` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_chat_window.py:Line 866` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_chat_window.py:Line 892` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_chat_window.py:Line 910` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_chat_window.py:Line 941` — `from PyQt6.QtWidgets import QPushButton`
    *   `tests\test_desktop_app.py:Line 112` — `from PyQt6.QtWidgets import QMessageBox, QWidget`
    *   `tests\test_desktop_app.py:Line 1395` — `from PyQt6 import QtWidgets`
    *   `tests\test_desktop_app.py:Line 1503` — `from PyQt6.QtWidgets import QLabel, QPushButton`
    *   `tests\test_desktop_app.py:Line 1528` — `from PyQt6.QtWidgets import QSystemTrayIcon`
    *   `tests\test_desktop_app.py:Line 1539` — `from PyQt6.QtWidgets import QLabel, QSystemTrayIcon`
    *   `tests\test_desktop_app.py:Line 1665` — `from PyQt6.QtGui import QAction`
    *   `tests\test_desktop_app.py:Line 1756` — `from PyQt6.QtGui import QAction`
    *   `tests\test_desktop_app.py:Line 1802` — `from PyQt6.QtGui import QAction`
    *   `tests\test_dictation_history.py:Line 430` — `from PyQt6.QtCore import QEventLoop, QTimer`
    *   `tests\test_dictation_history.py:Line 431` — `from PyQt6.QtWidgets import QMessageBox`
    *   `tests\test_dictation_history.py:Line 482` — `from PyQt6.QtCore import Qt`
    *   `tests\test_dictation_history.py:Line 483` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_dictation_history.py:Line 187` — `from PyQt6.QtWidgets import QLabel, QScrollArea`
    *   `tests\test_dictation_history.py:Line 205` — `from PyQt6.QtWidgets import QScrollArea`
    *   `tests\test_dictation_history.py:Line 238` — `from PyQt6.QtWidgets import QScrollArea`
    *   `tests\test_dictation_history.py:Line 266` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_dictation_history.py:Line 282` — `from PyQt6.QtWidgets import QLabel, QPushButton`
    *   `tests\test_dictation_history.py:Line 311` — `from PyQt6.QtWidgets import QLabel, QPushButton, QMessageBox`
    *   `tests\test_dictation_history.py:Line 342` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_dictation_history_watching.py:Line 13` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_dictation_history_watching.py:Line 51` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_face_animation.py:Line 13` — `from PyQt6.QtCore import Qt, QPoint`
    *   `tests\test_face_animation.py:Line 14` — `from PyQt6.QtGui import QImage, QPainter, QRegion`
    *   `tests\test_face_presence.py:Line 3` — `from PyQt6.QtCore import Qt, QPoint, QPointF`
    *   `tests\test_face_presence.py:Line 4` — `from PyQt6.QtGui import QContextMenuEvent, QMouseEvent`
    *   `tests\test_face_presence.py:Line 5` — `from PyQt6.QtWidgets import QMenu`
    *   `tests\test_face_presence.py:Line 124` — `from PyQt6.QtGui import QImage, QPainter`
    *   `tests\test_face_presence.py:Line 161` — `from PyQt6.QtGui import QAction`
    *   `tests\test_face_presence.py:Line 216` — `from PyQt6.QtGui import QColor`
    *   `tests\test_face_presence.py:Line 229` — `from PyQt6.QtTest import QTest`
    *   `tests\test_issue_report_flow.py:Line 6` — `from PyQt6.QtWidgets import QCheckBox, QDialog, QLineEdit, QPlainTextEdit, QPushButton`
    *   `tests\test_issue_report_flow.py:Line 135` — `from PyQt6.QtWidgets import QScrollArea`
    *   `tests\test_issue_report_flow.py:Line 267` — `from PyQt6.QtWidgets import QScrollArea`
    *   `tests\test_log_progress.py:Line 38` — `from PyQt6.QtGui import QColor`
    *   `tests\test_low_confidence_feedback.py:Line 3` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_low_confidence_feedback.py:Line 4` — `from PyQt6.QtTest import QTest`
    *   `tests\test_memory_viewer_opening.py:Line 40` — `from PyQt6.QtWidgets import QMessageBox`
    *   `tests\test_memory_viewer_opening.py:Line 63` — `from PyQt6.QtWidgets import QWidget`
    *   `tests\test_memory_viewer_opening.py:Line 81` — `from PyQt6.QtWidgets import QWidget`
    *   `tests\test_model_recommendations.py:Line 97` — `from PyQt6.QtCore import Qt`
    *   `tests\test_model_recommendations.py:Line 98` — `from PyQt6.QtWidgets import QLabel, QPushButton`
    *   `tests\test_model_recommendations.py:Line 162` — `from PyQt6.QtWidgets import QScrollArea, QPushButton`
    *   `tests\test_selected_config_path.py:Line 50` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_settings_window.py:Line 510` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_setup_wizard.py:Line 706` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_setup_wizard.py:Line 866` — `from PyQt6.QtWidgets import QComboBox`
    *   `tests\test_setup_wizard.py:Line 1199` — `from PyQt6.QtWidgets import QComboBox`
    *   `tests\test_setup_wizard.py:Line 1206` — `from PyQt6.QtWidgets import QComboBox`
    *   `tests\test_setup_wizard.py:Line 1332` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1354` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1367` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1379` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1392` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1404` — `from PyQt6.QtWidgets import QDoubleSpinBox`
    *   `tests\test_setup_wizard.py:Line 1416` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1437` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1461` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1483` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1501` — `from PyQt6.QtWidgets import QDoubleSpinBox`
    *   `tests\test_setup_wizard.py:Line 1513` — `from PyQt6.QtWidgets import QDoubleSpinBox, QLabel`
    *   `tests\test_setup_wizard.py:Line 1803` — `from PyQt6.QtWidgets import QLabel`
    *   `tests\test_setup_wizard.py:Line 858` — `from PyQt6.QtWidgets import QLineEdit`
    *   `tests\test_update_download_cancellation.py:Line 8` — `from PyQt6.QtWidgets import QDialog`
    *   `tests\test_voice_pause_tray.py:Line 8` — `from PyQt6.QtGui import QAction`
    *   `tests\test_wizard_layout.py:Line 4` — `from PyQt6.QtCore import QPoint`
    *   `tests\test_wizard_layout.py:Line 5` — `from PyQt6.QtTest import QTest`
    *   `tests\test_wizard_layout.py:Line 6` — `from PyQt6.QtWidgets import QComboBox, QDoubleSpinBox, QLineEdit, QPushButton, QScrollArea, QWizard`
    *   `tests\test_wizard_layout.py:Line 101` — `from PyQt6.QtWidgets import QStyle, QStyleOptionButton`
    *   `tests\fixtures\macos_hotkey_probe.py:Line 3` — `from PyQt6.QtWidgets import QApplication`
    *   `tests\fixtures\macos_paste_probe.py:Line 7` — `from PyQt6.QtWidgets import QApplication`
    *   `tests\fixtures\macos_tray_probe.py:Line 4` — `from PyQt6.QtWidgets import QApplication, QSystemTrayIcon, QMenu`
    *   `tests\fixtures\macos_tray_probe.py:Line 5` — `from PyQt6.QtGui import QIcon, QPixmap`
    *   `tests\fixtures\macos_tray_probe.py:Line 6` — `from PyQt6.QtCore import Qt`

### geoip2
    *   `scripts\setup_geolocation.py:Line 50` — `import geoip2`
    *   `src\jarvis\utils\location.py:Line 14` — `import geoip2.database`
    *   `src\jarvis\utils\location.py:Line 15` — `import geoip2.errors`

### pytest
    *   `conftest.py:Line 7` — `import pytest`
    *   `evals\conftest.py:Line 14` — `import pytest`
    *   `evals\helpers.py:Line 84` — `import pytest`
    *   `evals\helpers.py:Line 131` — `import pytest`
    *   `evals\test_agent_behavior.py:Line 15` — `import pytest`
    *   `evals\test_apostrophe_echo.py:Line 7` — `import pytest`
    *   `evals\test_complex_flows.py:Line 19` — `import pytest`
    *   `evals\test_context_switch_tools.py:Line 34` — `import pytest`
    *   `evals\test_diary_graph_source_identity.py:Line 5` — `import pytest`
    *   `evals\test_diary_pending_snapshot.py:Line 5` — `import pytest`
    *   `evals\test_diary_summariser_hygiene.py:Line 18` — `import pytest`
    *   `evals\test_diary_supplies_missing_tool_arg.py:Line 10` — `import pytest`
    *   `evals\test_distinct_tool_calls.py:Line 5` — `import pytest`
    *   `evals\test_embedded_user_fact_capture.py:Line 5` — `import pytest`
    *   `evals\test_empty_reply_recovery.py:Line 4` — `import pytest`
    *   `evals\test_followup_supplies_missing_tool_arg.py:Line 10` — `import pytest`
    *   `evals\test_graph_branch_routing.py:Line 29` — `import pytest`
    *   `evals\test_graph_completed_transactions.py:Line 4` — `import pytest`
    *   `evals\test_graph_extraction_json.py:Line 4` — `import pytest`
    *   `evals\test_graph_fact_source_grounding.py:Line 4` — `import pytest`
    *   `evals\test_graph_merge_concurrency.py:Line 4` — `import pytest`
    *   `evals\test_graph_recall_readers.py:Line 4` — `import pytest`
    *   `evals\test_graph_source_date.py:Line 6` — `import pytest`
    *   `evals\test_graph_split_capacity.py:Line 2` — `import pytest`
    *   `evals\test_graph_split_concurrency.py:Line 5` — `import pytest`
    *   `evals\test_graph_supplies_missing_tool_arg.py:Line 10` — `import pytest`
    *   `evals\test_greeting_no_tools.py:Line 10` — `import pytest`
    *   `evals\test_hybrid_retrieval.py:Line 10` — `import pytest`
    *   `evals\test_intent_judge.py:Line 8` — `import pytest`
    *   `evals\test_invalid_tool_arguments.py:Line 4` — `import pytest`
    *   `evals\test_knowledge_extraction.py:Line 22` — `import pytest`
    *   `evals\test_large_page_reading.py:Line 7` — `import pytest`
    *   `evals\test_listener_integration.py:Line 25` — `import pytest`
    *   `evals\test_local_whisper_runtime.py:Line 6` — `import pytest`
    *   `evals\test_max_turn_digest.py:Line 2` — `import pytest`
    *   `evals\test_mcp_fault_reply.py:Line 8` — `import pytest`
    *   `evals\test_meal_deletion_followup.py:Line 6` — `import pytest`
    *   `evals\test_meal_summary_coverage.py:Line 6` — `import pytest`
    *   `evals\test_memory_digest_identity.py:Line 3` — `import pytest`
    *   `evals\test_memory_digest_preferences.py:Line 3` — `import pytest`
    *   `evals\test_memory_digest_relevance.py:Line 2` — `import pytest`
    *   `evals\test_memory_recall_parameters.py:Line 4` — `import pytest`
    *   `evals\test_merge_consolidation.py:Line 25` — `import pytest`
    *   `evals\test_multi_turn_context.py:Line 17` — `import pytest`
    *   `evals\test_nutrition_extraction.py:Line 19` — `import pytest`
    *   `evals\test_personal_context_location.py:Line 5` — `import pytest`
    *   `evals\test_planner_clock_context.py:Line 5` — `import pytest`
    *   `evals\test_planner_dialogue_window.py:Line 4` — `import pytest`
    *   `evals\test_planner_file_listing.py:Line 4` — `import pytest`
    *   `evals\test_planner_literal_content.py:Line 4` — `import pytest`
    *   `evals\test_planner_location_resolution.py:Line 2` — `import pytest`
    *   `evals\test_planner_personalisation.py:Line 17` — `import pytest`
    *   `evals\test_planner_required_resolution.py:Line 2` — `import pytest`
    *   `evals\test_planner_schema_context.py:Line 2` — `import pytest`
    *   `evals\test_planner_trivial_with_tools.py:Line 12` — `import pytest`
    *   `evals\test_plan_failure_recovery.py:Line 4` — `import pytest`
    *   `evals\test_possessor_field_repro.py:Line 27` — `import pytest`
    *   `evals\test_provider_tool_history.py:Line 6` — `import pytest`
    *   `evals\test_recency_superseding.py:Line 24` — `import pytest`
    *   `evals\test_recent_record_followup.py:Line 6` — `import pytest`
    *   `evals\test_reply_tool_loop.py:Line 12` — `import pytest`
    *   `evals\test_router_requested_action.py:Line 3` — `import pytest`
    *   `evals\test_saved_plan_calendar.py:Line 7` — `import pytest`
    *   `evals\test_saved_reasoning_settings.py:Line 4` — `import pytest`
    *   `evals\test_scored_verifier_calibration.py:Line 2` — `import pytest`
    *   `evals\test_speech_constraint_resolution.py:Line 2` — `import pytest`
    *   `evals\test_speech_context_routing.py:Line 2` — `import pytest`
    *   `evals\test_stop_echo_controls.py:Line 4` — `import pytest`
    *   `evals\test_tool_digest_facts.py:Line 2` — `import pytest`
    *   `evals\test_tool_protocol_schema.py:Line 5` — `import pytest`
    *   `evals\test_tool_router_context_aware.py:Line 27` — `import pytest`
    *   `evals\test_tool_router_implicit.py:Line 30` — `import pytest`
    *   `evals\test_tool_selection.py:Line 10` — `import pytest`
    *   `evals\test_unicode_wake_aliases.py:Line 3` — `import pytest`
    *   `evals\test_url_redaction.py:Line 4` — `import pytest`
    *   `evals\test_utility_memory_recall.py:Line 2` — `import pytest`
    *   `evals\test_warm_profile_external_edits.py:Line 4` — `import pytest`
    *   `evals\test_weather_autoderive_location.py:Line 36` — `import pytest`
    *   `evals\test_weather_calendar.py:Line 7` — `import pytest`
    *   `evals\test_weather_explicit_location_guidance.py:Line 4` — `import pytest`
    *   `evals\test_weather_place_extraction.py:Line 5` — `import pytest`
    *   `evals\test_web_search_fallback.py:Line 20` — `import pytest`
    *   `evals\test_web_search_result_grounding.py:Line 6` — `import pytest`
    *   `evals\test_whisper_audio_evidence.py:Line 12` — `import pytest`
    *   `evals\tool_routing.py:Line 5` — `import pytest`
    *   `tests\conftest.py:Line 6` — `import pytest`
    *   `tests\test_apostrophe_echo.py:Line 2` — `import pytest`
    *   `tests\test_audio_capture_pipeline.py:Line 8` — `import pytest`
    *   `tests\test_audio_test_policy.py:Line 10` — `import pytest`
    *   `tests\test_benchmark_collection_safety.py:Line 8` — `import pytest`
    *   `tests\test_chat_submission.py:Line 24` — `import pytest`
    *   `tests\test_chat_window.py:Line 19` — `import pytest`
    *   `tests\test_compound_query.py:Line 3` — `import pytest`
    *   `tests\test_config_atomic_save.py:Line 16` — `import pytest`
    *   `tests\test_config_example.py:Line 8` — `import pytest`
    *   `tests\test_config_mcps.py:Line 1` — `import pytest`
    *   `tests\test_config_models.py:Line 8` — `import pytest`
    *   `tests\test_config_path_expansion.py:Line 6` — `import pytest`
    *   `tests\test_conversation_cache_inputs.py:Line 2` — `import pytest`
    *   `tests\test_daemon_graph_store_cleanup.py:Line 6` — `import pytest`
    *   `tests\test_daemon_lifecycle.py:Line 6` — `import pytest`
    *   `tests\test_daemon_lock.py:Line 11` — `import pytest`
    *   `tests\test_debug_side_effects.py:Line 5` — `import pytest`
    *   `tests\test_desktop_app.py:Line 4` — `import pytest`
    *   `tests\test_desktop_keepalive_workers.py:Line 12` — `import pytest`
    *   `tests\test_desktop_release_changes.py:Line 8` — `import pytest`
    *   `tests\test_dialogue_memory.py:Line 3` — `import pytest`
    *   `tests\test_dialogue_memory_hot_cache.py:Line 16` — `import pytest`
    *   `tests\test_dialogue_memory_tool_carryover.py:Line 10` — `import pytest`
    *   `tests\test_diary_bootstrap_contention.py:Line 5` — `import pytest`
    *   `tests\test_diary_constructor_cleanup.py:Line 5` — `import pytest`
    *   `tests\test_diary_embedding_failure.py:Line 6` — `import pytest`
    *   `tests\test_diary_embedding_freshness.py:Line 8` — `import pytest`
    *   `tests\test_diary_enrichment_flow.py:Line 13` — `import pytest`
    *   `tests\test_diary_fallback_index.py:Line 5` — `import pytest`
    *   `tests\test_diary_generation_budget.py:Line 5` — `import pytest`
    *   `tests\test_diary_graph_logging.py:Line 18` — `import pytest`
    *   `tests\test_diary_graph_source_identity.py:Line 6` — `import pytest`
    *   `tests\test_diary_graph_store_cleanup.py:Line 6` — `import pytest`
    *   `tests\test_diary_import.py:Line 13` — `import pytest`
    *   `tests\test_diary_import_lifetime.py:Line 7` — `import pytest`
    *   `tests\test_diary_pending_batches.py:Line 9` — `import pytest`
    *   `tests\test_diary_rewrite_sweep.py:Line 12` — `import pytest`
    *   `tests\test_diary_summary_identity.py:Line 7` — `import pytest`
    *   `tests\test_diary_topic_optimise.py:Line 15` — `import pytest`
    *   `tests\test_dictation.py:Line 9` — `import pytest`
    *   `tests\test_dictation_callback_sessions.py:Line 8` — `import pytest`
    *   `tests\test_dictation_clipboard_failure_reporting.py:Line 7` — `import pytest`
    *   `tests\test_dictation_history.py:Line 10` — `import pytest`
    *   `tests\test_dictation_history_atomic_save.py:Line 8` — `import pytest`
    *   `tests\test_dictation_history_failure_reporting.py:Line 7` — `import pytest`
    *   `tests\test_dictation_history_read_failure.py:Line 6` — `import pytest`
    *   `tests\test_dictation_history_record_validation.py:Line 6` — `import pytest`
    *   `tests\test_dictation_history_watching.py:Line 5` — `import pytest`
    *   `tests\test_dictation_history_writers.py:Line 7` — `import pytest`
    *   `tests\test_dictation_paste_failure_recovery.py:Line 4` — `import pytest`
    *   `tests\test_dictation_session_rate.py:Line 8` — `import pytest`
    *   `tests\test_dictation_shortcut_events.py:Line 6` — `import pytest`
    *   `tests\test_dictation_test_isolation.py:Line 9` — `import pytest`
    *   `tests\test_dictation_worker_lifetime.py:Line 5` — `import pytest`
    *   `tests\test_direct_response_completeness.py:Line 7` — `import pytest`
    *   `tests\test_distinct_tool_calls.py:Line 4` — `import pytest`
    *   `tests\test_echo_detection.py:Line 9` — `import pytest`
    *   `tests\test_echo_prefix_source_boundary.py:Line 1` — `import pytest`
    *   `tests\test_embedding_timeout_wiring.py:Line 2` — `import pytest`
    *   `tests\test_empty_reply_recovery.py:Line 5` — `import pytest`
    *   `tests\test_engine_hot_window_caches.py:Line 19` — `import pytest`
    *   `tests\test_engine_kv_cache.py:Line 23` — `import pytest`
    *   `tests\test_engine_planner_integration.py:Line 18` — `import pytest`
    *   `tests\test_engine_registered_text_calls.py:Line 5` — `import pytest`
    *   `tests\test_engine_tool_carryover.py:Line 8` — `import pytest`
    *   `tests\test_engine_tool_carryover_guard.py:Line 5` — `import pytest`
    *   `tests\test_engine_tool_search_loop.py:Line 13` — `import pytest`
    *   `tests\test_enrichment.py:Line 6` — `import pytest`
    *   `tests\test_eval_backend_config.py:Line 6` — `import pytest`
    *   `tests\test_eval_diary_config.py:Line 4` — `import pytest`
    *   `tests\test_eval_helpers.py:Line 13` — `import pytest`
    *   `tests\test_eval_max_turn_digest_contract.py:Line 7` — `import pytest`
    *   `tests\test_eval_memory_digest_contract.py:Line 10` — `import pytest`
    *   `tests\test_eval_memory_digest_relevance_contract.py:Line 7` — `import pytest`
    *   `tests\test_eval_memory_tool_grounding_contract.py:Line 11` — `import pytest`
    *   `tests\test_eval_multi_turn_contract.py:Line 10` — `import pytest`
    *   `tests\test_eval_nutrition_config.py:Line 4` — `import pytest`
    *   `tests\test_eval_recall_parameter_contract.py:Line 10` — `import pytest`
    *   `tests\test_eval_search_fixture.py:Line 2` — `import pytest`
    *   `tests\test_eval_speech_config.py:Line 3` — `import pytest`
    *   `tests\test_eval_tool_digest_facts_contract.py:Line 7` — `import pytest`
    *   `tests\test_eval_verdicts.py:Line 4` — `import pytest`
    *   `tests\test_eval_verifier_selection.py:Line 4` — `import pytest`
    *   `tests\test_face_animation.py:Line 12` — `import pytest`
    *   `tests\test_face_presence.py:Line 2` — `import pytest`
    *   `tests\test_face_widget.py:Line 7` — `import pytest`
    *   `tests\test_factory_dispatch_wiring.py:Line 12` — `import pytest`
    *   `tests\test_failed_tool_followup_recovery.py:Line 3` — `import pytest`
    *   `tests\test_faster_whisper_bundle_integration.py:Line 7` — `import pytest`
    *   `tests\test_fetch_web_page_argument_types.py:Line 5` — `import pytest`
    *   `tests\test_fetch_web_page_byte_limit.py:Line 6` — `import pytest`
    *   `tests\test_fetch_web_page_decompression_memory.py:Line 8` — `import pytest`
    *   `tests\test_fetch_web_page_streaming.py:Line 7` — `import pytest`
    *   `tests\test_frozen_env_guards.py:Line 10` — `import pytest`
    *   `tests\test_graph_access_tracking.py:Line 6` — `import pytest`
    *   `tests\test_graph_bootstrap_cleanup.py:Line 4` — `import pytest`
    *   `tests\test_graph_bootstrap_contention.py:Line 5` — `import pytest`
    *   `tests\test_graph_branch_dedupe.py:Line 4` — `import pytest`
    *   `tests\test_graph_concurrent_writes.py:Line 5` — `import pytest`
    *   `tests\test_graph_fact_hygiene.py:Line 8` — `import pytest`
    *   `tests\test_graph_memory.py:Line 5` — `import pytest`
    *   `tests\test_graph_memory_tools.py:Line 7` — `import pytest`
    *   `tests\test_graph_merge_concurrency.py:Line 4` — `import pytest`
    *   `tests\test_graph_mutation_listener.py:Line 14` — `import pytest`
    *   `tests\test_graph_ops.py:Line 10` — `import pytest`
    *   `tests\test_graph_parent_validation.py:Line 2` — `import pytest`
    *   `tests\test_graph_profile_revision.py:Line 4` — `import pytest`
    *   `tests\test_graph_split_concurrency.py:Line 4` — `import pytest`
    *   `tests\test_graph_timing_context.py:Line 5` — `import pytest`
    *   `tests\test_greeting_no_tools.py:Line 12` — `import pytest`
    *   `tests\test_hot_window_input.py:Line 16` — `import pytest`
    *   `tests\test_hot_window_timer_ownership.py:Line 5` — `import pytest`
    *   `tests\test_hybrid_memory_search.py:Line 8` — `import pytest`
    *   `tests\test_inactive_settings.py:Line 6` — `import pytest`
    *   `tests\test_install_cuda.py:Line 34` — `import pytest`
    *   `tests\test_intent_judge.py:Line 3` — `import pytest`
    *   `tests\test_invalid_tool_arguments.py:Line 4` — `import pytest`
    *   `tests\test_issue_report_flow.py:Line 5` — `import pytest`
    *   `tests\test_linux_update_archive_integrity.py:Line 10` — `import pytest`
    *   `tests\test_listener_shutdown.py:Line 6` — `import pytest`
    *   `tests\test_listening_ux_overhaul.py:Line 12` — `import pytest`
    *   `tests\test_llm_arguments_encoding.py:Line 7` — `import pytest`
    *   `tests\test_llm_backend.py:Line 19` — `import pytest`
    *   `tests\test_llm_factory.py:Line 14` — `import pytest`
    *   `tests\test_llm_gpt_oss_thinking.py:Line 6` — `import pytest`
    *   `tests\test_llm_http.py:Line 7` — `import pytest`
    *   `tests\test_llm_openai_compatible.py:Line 14` — `import pytest`
    *   `tests\test_llm_streaming_budget.py:Line 10` — `import pytest`
    *   `tests\test_llm_thinking.py:Line 11` — `import pytest`
    *   `tests\test_llm_timeout_diagnostics.py:Line 6` — `import pytest`
    *   `tests\test_local_files_boolean_arguments.py:Line 4` — `import pytest`
    *   `tests\test_local_files_glob_confinement.py:Line 4` — `import pytest`
    *   `tests\test_local_files_path_arguments.py:Line 3` — `import pytest`
    *   `tests\test_local_llm_privacy.py:Line 8` — `import pytest`
    *   `tests\test_location_context.py:Line 3` — `import pytest`
    *   `tests\test_log_progress.py:Line 8` — `import pytest`
    *   `tests\test_log_progress.py:Line 129` — `import pytest`
    *   `tests\test_low_confidence_events.py:Line 10` — `import pytest`
    *   `tests\test_low_confidence_feedback.py:Line 2` — `import pytest`
    *   `tests\test_macos_crash_report.py:Line 7` — `import pytest`
    *   `tests\test_macos_hotkey_integration.py:Line 7` — `import pytest`
    *   `tests\test_macos_hotkey_startup.py:Line 7` — `import pytest`
    *   `tests\test_macos_paste_integration.py:Line 7` — `import pytest`
    *   `tests\test_macos_paste_safety.py:Line 7` — `import pytest`
    *   `tests\test_macos_tray_guard.py:Line 4` — `import pytest`
    *   `tests\test_macos_tray_integration.py:Line 7` — `import pytest`
    *   `tests\test_max_turn_digest_generation_budget.py:Line 4` — `import pytest`
    *   `tests\test_mcp_client.py:Line 3` — `import pytest`
    *   `tests\test_mcp_discovery.py:Line 3` — `import pytest`
    *   `tests\test_mcp_error_reporting.py:Line 9` — `import pytest`
    *   `tests\test_mcp_integration.py:Line 8` — `import pytest`
    *   `tests\test_mcp_shutdown.py:Line 6` — `import pytest`
    *   `tests\test_memory_digest_generation_budget.py:Line 4` — `import pytest`
    *   `tests\test_memory_query_indexes.py:Line 5` — `import pytest`
    *   `tests\test_memory_recall_decision.py:Line 4` — `import pytest`
    *   `tests\test_memory_recall_generation_budget.py:Line 5` — `import pytest`
    *   `tests\test_memory_viewer_diary_optimise_api.py:Line 20` — `import pytest`
    *   `tests\test_memory_viewer_diary_scrub_api.py:Line 18` — `import pytest`
    *   `tests\test_memory_viewer_graph_api.py:Line 5` — `import pytest`
    *   `tests\test_memory_viewer_meal_rendering.py:Line 8` — `import pytest`
    *   `tests\test_memory_viewer_offline_assets.py:Line 7` — `import pytest`
    *   `tests\test_memory_viewer_opening.py:Line 6` — `import pytest`
    *   `tests\test_memory_viewer_progress_rendering.py:Line 9` — `import pytest`
    *   `tests\test_missing_portaudio.py:Line 21` — `import pytest`
    *   `tests\test_mlx_bundle.py:Line 7` — `import pytest`
    *   `tests\test_mlx_bundle_integration.py:Line 7` — `import pytest`
    *   `tests\test_model_budget_selection.py:Line 4` — `import pytest`
    *   `tests\test_model_default_budgets.py:Line 5` — `import pytest`
    *   `tests\test_model_recommendations.py:Line 4` — `import pytest`
    *   `tests\test_model_tiers.py:Line 6` — `import pytest`
    *   `tests\test_nonblocking_voice_capture.py:Line 8` — `import pytest`
    *   `tests\test_ollama_model_identity.py:Line 5` — `import pytest`
    *   `tests\test_openai_compatible_e2e.py:Line 23` — `import pytest`
    *   `tests\test_performance_sample_validity.py:Line 6` — `import pytest`
    *   `tests\test_personal_context.py:Line 6` — `import pytest`
    *   `tests\test_personal_context_verification.py:Line 6` — `import pytest`
    *   `tests\test_piper_download_concurrency.py:Line 5` — `import pytest`
    *   `tests\test_piper_download_recovery.py:Line 5` — `import pytest`
    *   `tests\test_piper_tts.py:Line 3` — `import pytest`
    *   `tests\test_planner.py:Line 14` — `import pytest`
    *   `tests\test_planner_clock_context.py:Line 6` — `import pytest`
    *   `tests\test_planner_complete_arguments.py:Line 5` — `import pytest`
    *   `tests\test_planner_dialogue_window.py:Line 4` — `import pytest`
    *   `tests\test_planner_generation_budget.py:Line 4` — `import pytest`
    *   `tests\test_planner_registered_names.py:Line 3` — `import pytest`
    *   `tests\test_planner_required_arguments.py:Line 4` — `import pytest`
    *   `tests\test_planner_schema_context.py:Line 4` — `import pytest`
    *   `tests\test_planner_temporal_literals.py:Line 4` — `import pytest`
    *   `tests\test_planner_typed_arguments.py:Line 2` — `import pytest`
    *   `tests\test_planner_url_arguments.py:Line 4` — `import pytest`
    *   `tests\test_plan_failure_recovery.py:Line 4` — `import pytest`
    *   `tests\test_portaudio_serialisation.py:Line 28` — `import pytest`
    *   `tests\test_prompts.py:Line 7` — `import pytest`
    *   `tests\test_prompt_dump.py:Line 9` — `import pytest`
    *   `tests\test_provider_model_resolution.py:Line 23` — `import pytest`
    *   `tests\test_public_website.py:Line 9` — `import pytest`
    *   `tests\test_qt_fixture_lifecycle.py:Line 9` — `import pytest`
    *   `tests\test_query_context_comparison.py:Line 7` — `import pytest`
    *   `tests\test_query_validation.py:Line 3` — `import pytest`
    *   `tests\test_queued_tts_tail_echo.py:Line 5` — `import pytest`
    *   `tests\test_readme_presentation.py:Line 8` — `import pytest`
    *   `tests\test_recall_gate.py:Line 5` — `import pytest`
    *   `tests\test_redact_extended.py:Line 3` — `import pytest`
    *   `tests\test_redact_large_text.py:Line 5` — `import pytest`
    *   `tests\test_release_smoke_promotion.py:Line 7` — `import pytest`
    *   `tests\test_retired_evaluator_config.py:Line 4` — `import pytest`
    *   `tests\test_review_478_defects.py:Line 17` — `import pytest`
    *   `tests\test_router_operation_contract.py:Line 5` — `import pytest`
    *   `tests\test_runtime_control_config.py:Line 5` — `import pytest`
    *   `tests\test_scored_eval_verdicts.py:Line 4` — `import pytest`
    *   `tests\test_search_http.py:Line 14` — `import pytest`
    *   `tests\test_selected_config_path.py:Line 5` — `import pytest`
    *   `tests\test_settings_window.py:Line 12` — `import pytest`
    *   `tests\test_setup_wizard.py:Line 16` — `import pytest`
    *   `tests\test_short_query_echo.py:Line 3` — `import pytest`
    *   `tests\test_speech_context.py:Line 5` — `import pytest`
    *   `tests\test_splash_screen.py:Line 8` — `import pytest`
    *   `tests\test_state_manager.py:Line 10` — `import pytest`
    *   `tests\test_stop_command_echo.py:Line 5` — `import pytest`
    *   `tests\test_text_tool_call_parser.py:Line 10` — `import pytest`
    *   `tests\test_time_context.py:Line 6` — `import pytest`
    *   `tests\test_timing_recorder.py:Line 6` — `import pytest`
    *   `tests\test_tools.py:Line 1` — `import pytest`
    *   `tests\test_tool_digest_generation_budget.py:Line 4` — `import pytest`
    *   `tests\test_tool_failure_diagnostics.py:Line 5` — `import pytest`
    *   `tests\test_tool_resource_followup.py:Line 5` — `import pytest`
    *   `tests\test_tool_router_resolution.py:Line 14` — `import pytest`
    *   `tests\test_tool_search_tool.py:Line 5` — `import pytest`
    *   `tests\test_tool_selection.py:Line 4` — `import pytest`
    *   `tests\test_transcript_buffer.py:Line 5` — `import pytest`
    *   `tests\test_tts_preprocessing.py:Line 3` — `import pytest`
    *   `tests\test_tts_startup_status.py:Line 4` — `import pytest`
    *   `tests\test_tune_player.py:Line 21` — `import pytest`
    *   `tests\test_updater.py:Line 6` — `import pytest`
    *   `tests\test_update_download_cancellation.py:Line 7` — `import pytest`
    *   `tests\test_update_download_cleanup.py:Line 5` — `import pytest`
    *   `tests\test_vector_store_isolation.py:Line 4` — `import pytest`
    *   `tests\test_vector_validation.py:Line 6` — `import pytest`
    *   `tests\test_vector_write_failure.py:Line 6` — `import pytest`
    *   `tests\test_voice_listener.py:Line 10` — `import pytest`
    *   `tests\test_voice_pause.py:Line 6` — `import pytest`
    *   `tests\test_voice_pause_tray.py:Line 7` — `import pytest`
    *   `tests\test_voice_query_language.py:Line 5` — `import pytest`
    *   `tests\test_vram.py:Line 12` — `import pytest`
    *   `tests\test_wake_alias_boundaries.py:Line 2` — `import pytest`
    *   `tests\test_wake_detection.py:Line 5` — `import pytest`
    *   `tests\test_warm_profile_external_edits.py:Line 4` — `import pytest`
    *   `tests\test_web_search_response_lifecycle.py:Line 6` — `import pytest`
    *   `tests\test_web_search_result_structure.py:Line 5` — `import pytest`
    *   `tests\test_whisper_audio_evidence.py:Line 6` — `import pytest`
    *   `tests\test_whisper_cache_boundary.py:Line 2` — `import pytest`
    *   `tests\test_whisper_cache_failures.py:Line 4` — `import pytest`
    *   `tests\test_whisper_capabilities.py:Line 6` — `import pytest`
    *   `tests\test_whisper_models.py:Line 5` — `import pytest`
    *   `tests\test_whisper_network_failures.py:Line 6` — `import pytest`
    *   `tests\test_whisper_performance_guidance.py:Line 8` — `import pytest`
    *   `tests\test_whisper_pre_download.py:Line 8` — `import pytest`
    *   `tests\test_whisper_runtime_recovery.py:Line 6` — `import pytest`
    *   `tests\test_wizard_layout.py:Line 3` — `import pytest`
    *   `tests\test_worker_probe_safety.py:Line 7` — `import pytest`
    *   `tests\performance\test_pipeline_timings.py:Line 30` — `import pytest`
    *   `tests\tools\builtin\test_fetch_web_page.py:Line 3` — `import pytest`
    *   `tests\tools\builtin\test_local_files.py:Line 3` — `import pytest`
    *   `tests\tools\builtin\test_screenshot.py:Line 3` — `import pytest`
    *   `tests\tools\builtin\test_stop.py:Line 3` — `import pytest`
    *   `tests\tools\builtin\test_time_tool.py:Line 5` — `import pytest`
    *   `tests\tools\builtin\test_weather.py:Line 3` — `import pytest`
    *   `tests\tools\builtin\test_weather_calendar.py:Line 6` — `import pytest`
    *   `tests\tools\builtin\test_weather_place_punctuation.py:Line 4` — `import pytest`
    *   `tests\tools\builtin\test_web_search.py:Line 3` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_fetch_meal_time_bounds.py:Line 5` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_log_meal.py:Line 5` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_log_meal_generation.py:Line 7` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_log_meal_persistence.py:Line 6` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_meal_deletion_references.py:Line 5` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_meal_recording_eligibility.py:Line 6` — `import pytest`
    *   `tests\tools\builtin\nutrition\test_meal_summary_estimates.py:Line 5` — `import pytest`

### lxml
    *   `src\jarvis\tools\builtin\fetch_web_page.py:Line 8` — `from lxml import etree`

### requests
    *   `evals\query_context_comparison.py:Line 22` — `import requests`
    *   `src\desktop_app\setup_wizard.py:Line 23` — `import requests`
    *   `src\desktop_app\updater.py:Line 22` — `import requests`
    *   `src\jarvis\listening\model_download.py:Line 51` — `from requests.exceptions import ConnectionError, RequestException, Timeout`
    *   `src\jarvis\listening\model_download.py:Line 107` — `from requests.exceptions import ConnectionError`
    *   `src\jarvis\llm\errors.py:Line 3` — `import requests`
    *   `src\jarvis\llm\http.py:Line 9` — `import requests`
    *   `src\jarvis\llm\ollama.py:Line 14` — `import requests`
    *   `src\jarvis\llm\openai_compatible.py:Line 31` — `import requests`
    *   `src\jarvis\llm\streaming.py:Line 6` — `import requests`
    *   `src\jarvis\output\tts.py:Line 46` — `import requests`
    *   `src\jarvis\output\tts.py:Line 133` — `import requests`
    *   `src\jarvis\tools\http_response.py:Line 2` — `import requests`
    *   `src\jarvis\tools\builtin\fetch_web_page.py:Line 3` — `import requests`
    *   `src\jarvis\tools\builtin\time_tool.py:Line 18` — `import requests`
    *   `src\jarvis\tools\builtin\weather.py:Line 3` — `import requests`
    *   `src\jarvis\tools\builtin\web_search.py:Line 9` — `import requests`
    *   `tests\conftest.py:Line 248` — `import requests`
    *   `tests\conftest.py:Line 315` — `import requests`
    *   `tests\test_dictation.py:Line 984` — `import requests`
    *   `tests\test_eval_speech_config.py:Line 11` — `import requests`
    *   `tests\test_fetch_web_page_argument_types.py:Line 6` — `import requests`
    *   `tests\test_intent_judge.py:Line 327` — `import requests`
    *   `tests\test_intent_judge.py:Line 346` — `import requests`
    *   `tests\test_intent_judge.py:Line 384` — `import requests`
    *   `tests\test_intent_judge.py:Line 419` — `import requests`
    *   `tests\test_intent_judge.py:Line 391` — `import requests`
    *   `tests\test_llm_arguments_encoding.py:Line 8` — `import requests`
    *   `tests\test_llm_backend.py:Line 137` — `import requests`
    *   `tests\test_llm_backend.py:Line 192` — `import requests`
    *   `tests\test_llm_backend.py:Line 204` — `import requests`
    *   `tests\test_llm_backend.py:Line 228` — `import requests`
    *   `tests\test_llm_backend.py:Line 239` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 190` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 200` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 210` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 297` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 314` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 328` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 341` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 360` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 397` — `import requests`
    *   `tests\test_llm_openai_compatible.py:Line 422` — `import requests`
    *   `tests\test_llm_thinking.py:Line 128` — `import requests`
    *   `tests\test_llm_timeout_diagnostics.py:Line 7` — `import requests`
    *   `tests\test_ollama_model_identity.py:Line 6` — `import requests`
    *   `tests\test_piper_download_concurrency.py:Line 6` — `import requests`
    *   `tests\test_piper_download_recovery.py:Line 6` — `import requests`
    *   `tests\test_piper_tts.py:Line 572` — `import requests`
    *   `tests\test_piper_tts.py:Line 601` — `import requests`
    *   `tests\test_piper_tts.py:Line 625` — `import requests`
    *   `tests\test_setup_wizard.py:Line 17` — `import requests`
    *   `tests\test_updater.py:Line 247` — `import requests`
    *   `tests\test_voice_listener.py:Line 18` — `import requests`
    *   `tests\test_web_search_response_lifecycle.py:Line 7` — `import requests`
    *   `tests\test_whisper_network_failures.py:Line 7` — `import requests`
    *   `tests\test_whisper_pre_download.py:Line 235` — `import requests`
    *   `tests\test_whisper_pre_download.py:Line 263` — `import requests`
    *   `tests\test_whisper_pre_download.py:Line 289` — `import requests`
    *   `tests\performance\test_pipeline_timings.py:Line 31` — `import requests`
    *   `tests\tools\builtin\test_fetch_web_page.py:Line 5` — `import requests`
    *   `tests\tools\builtin\test_time_tool.py:Line 6` — `import requests`
    *   `tests\tools\builtin\test_weather.py:Line 5` — `import requests`
    *   `tests\tools\builtin\test_web_search.py:Line 6` — `import requests`

### curl_cffi
    *   `src\jarvis\tools\search_http.py:Line 4` — `from curl_cffi import requests`
    *   `src\jarvis\tools\search_http.py:Line 5` — `from curl_cffi.curl import CURL_WRITEFUNC_ERROR`
    *   `tests\conftest.py:Line 234` — `from curl_cffi.requests import Session`
    *   `tests\tools\builtin\test_web_search.py:Line 23` — `from curl_cffi.requests import Session`

### numpy
    *   `evals\test_local_whisper_runtime.py:Line 21` — `import numpy`
    *   `evals\test_local_whisper_runtime.py:Line 41` — `import numpy`
    *   `evals\test_local_whisper_runtime.py:Line 78` — `import numpy`
    *   `evals\test_whisper_audio_evidence.py:Line 31` — `import numpy`
    *   `evals\test_whisper_audio_evidence.py:Line 51` — `import numpy`
    *   `evals\test_whisper_audio_evidence.py:Line 82` — `import numpy`
    *   `evals\test_whisper_audio_evidence.py:Line 104` — `import numpy`
    *   `evals\test_whisper_audio_evidence.py:Line 121` — `import numpy`
    *   `src\jarvis\dictation\dictation_engine.py:Line 33` — `import numpy`
    *   `src\jarvis\listening\listener.py:Line 107` — `import numpy`
    *   `src\jarvis\output\tts.py:Line 874` — `import numpy`
    *   `src\jarvis\output\tune_player.py:Line 6` — `import numpy`
    *   `src\jarvis\tools\selection.py:Line 173` — `import numpy`
    *   `src\jarvis\utils\embedding_vector.py:Line 2` — `import numpy`
    *   `src\jarvis\utils\fast_vector_store.py:Line 6` — `import numpy`
    *   `src\jarvis\utils\vector_store.py:Line 7` — `import numpy`
    *   `tests\test_audio_capture_pipeline.py:Line 7` — `import numpy`
    *   `tests\test_dictation.py:Line 46` — `import numpy`
    *   `tests\test_dictation.py:Line 62` — `import numpy`
    *   `tests\test_dictation.py:Line 179` — `import numpy`
    *   `tests\test_dictation.py:Line 273` — `import numpy`
    *   `tests\test_dictation.py:Line 305` — `import numpy`
    *   `tests\test_dictation.py:Line 359` — `import numpy`
    *   `tests\test_dictation.py:Line 375` — `import numpy`
    *   `tests\test_dictation.py:Line 389` — `import numpy`
    *   `tests\test_dictation.py:Line 401` — `import numpy`
    *   `tests\test_dictation.py:Line 484` — `import numpy`
    *   `tests\test_dictation.py:Line 712` — `import numpy`
    *   `tests\test_dictation.py:Line 908` — `import numpy`
    *   `tests\test_dictation.py:Line 151` — `import numpy`
    *   `tests\test_dictation.py:Line 354` — `import numpy`
    *   `tests\test_dictation.py:Line 706` — `import numpy`
    *   `tests\test_dictation_callback_sessions.py:Line 7` — `import numpy`
    *   `tests\test_dictation_clipboard_failure_reporting.py:Line 6` — `import numpy`
    *   `tests\test_dictation_history.py:Line 364` — `import numpy`
    *   `tests\test_dictation_history.py:Line 397` — `import numpy`
    *   `tests\test_dictation_history_failure_reporting.py:Line 6` — `import numpy`
    *   `tests\test_dictation_session_rate.py:Line 7` — `import numpy`
    *   `tests\test_face_animation.py:Line 11` — `import numpy`
    *   `tests\test_low_confidence_events.py:Line 9` — `import numpy`
    *   `tests\test_nonblocking_voice_capture.py:Line 7` — `import numpy`
    *   `tests\test_settings_window.py:Line 515` — `import numpy`
    *   `tests\test_tune_player.py:Line 192` — `import numpy`
    *   `tests\test_vector_validation.py:Line 5` — `import numpy`
    *   `tests\test_voice_listener.py:Line 691` — `import numpy`
    *   `tests\test_voice_listener.py:Line 729` — `import numpy`
    *   `tests\test_voice_listener.py:Line 741` — `import numpy`
    *   `tests\test_voice_listener.py:Line 999` — `import numpy`
    *   `tests\test_voice_listener.py:Line 1008` — `import numpy`
    *   `tests\test_voice_listener.py:Line 1022` — `import numpy`
    *   `tests\test_voice_listener.py:Line 1035` — `import numpy`
    *   `tests\test_voice_listener.py:Line 1862` — `import numpy`
    *   `tests\test_voice_listener.py:Line 1119` — `import numpy`
    *   `tests\test_voice_pause.py:Line 5` — `import numpy`
    *   `tests\test_whisper_audio_evidence.py:Line 5` — `import numpy`
    *   `tests\test_whisper_performance_guidance.py:Line 7` — `import numpy`
    *   `tests\test_whisper_pre_download.py:Line 128` — `import numpy`
    *   `tests\test_whisper_pre_download.py:Line 146` — `import numpy`
    *   `tests\test_whisper_pre_download.py:Line 199` — `import numpy`
    *   `tests\test_whisper_runtime_recovery.py:Line 5` — `import numpy`
    *   `tests\fixtures\faster_whisper_bundle_probe.py:Line 2` — `import numpy`
    *   `tests\fixtures\mlx_bundle_probe.py:Line 3` — `import numpy`

### miniupnpc
    *   `src\jarvis\utils\location.py:Line 26` — `import miniupnpc`

### rapidfuzz
    *   `src\jarvis\listening\echo_detection.py:Line 10` — `from rapidfuzz import fuzz`
    *   `src\jarvis\utils\fuzzy_search.py:Line 5` — `from rapidfuzz import fuzz, process`

## 3. Proposed Replacement & Migration Strategy [AI RECOMMENDATION]
*AI-generated analysis based on observed usage patterns.*

### pygame Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### html2text Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### Pillow Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### webrtcvad Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### pytesseract Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### pyinstaller Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### mlx-whisper Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### pynput Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### pytest Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### pytest-repeat Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

### miniupnpc Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`

## 4. Suggested Verification Tests [AI RECOMMENDATION]
*   Run full test suite after migration
*   Verify critical user-facing workflows
*   Check for runtime warnings or deprecation notices

## 5. Executed Test Results [VERIFIED OBSERVATION]
*Actual terminal execution results comparing the original dependency against the replacement.*

*   **Baseline Test Suite (`pytest` with original dependencies):**
    *   **Exit Code:** `0`
    *   **Observed Output Summary:** `FAILED — Skipped - heavy desktop deps require display/audio`
*   **Migration Test Suite (`pytest` after package swap/refactor):**
    *   **Exit Code:** `N/A`
    *   **Observed Output Summary:** `Not executed`

## 6. Compatibility Gaps & Unresolved Risks [HYBRID ANALYSIS]
*   **Observed Breaking Changes (from test failure logs):** `[TO BE FILLED FROM SWAP TEST LOGS]`
*   **Open Concerns & Limitations:** `[AI TO FILL]`
