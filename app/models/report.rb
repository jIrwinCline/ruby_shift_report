class Report < ApplicationRecord
  belongs_to :user
  has_many :entries, dependent: :destroy

  # Could put validates
  # validates :body, presence: true

  def generate_doc
    require 'docx'
    entries = self.entries
    report = self
    user = User.find(self.user_id)
    
    doc = Docx::Document.open("template.docx")
    doc.bookmarks['start'].insert_multiple_lines(entries.map {|entry| "#{entry.body}" })
    doc.save('exampleUpdate.docx')
    { report: report, entries: entries, user: user}
  end
  
end
