import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

// Import CSS dan JS Froala
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

const EditorText = ({ content, onContentChange }) => {
  const handleModelChange = (model) => {
    onContentChange(model); // Memanggil fungsi untuk memperbarui konten di parent
  };

  return (
    <div>
      <FroalaEditor
        model={content}
        onModelChange={handleModelChange}
        config={{
          placeholderText: 'Tulis sesuatu...',
          toolbarButtons: [
            'bold', 'italic', 'underline', 'strikeThrough', '|',
            'paragraphFormat', 'align', '|',
            'insertImage', 'insertFile', 'insertLink', 'insertTable', '|',
            'undo', 'redo', 'html'
          ],
          quickInsertTags: ['img', 'table', 'ul'],
          imageUpload: true,
          imageUploadURL: '/upload_image',
          fileUpload: true,
          fileUploadURL: '/upload_file',
          events: {
            'image.inserted': (img) => {
              console.log('Image added:', img);
            },
            'file.uploaded': (response) => {
              console.log('File uploaded:', response);
            },
          },
        }}
      />
    </div>
  );
};

export default EditorText;