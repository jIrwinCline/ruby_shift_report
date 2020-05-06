class Report < ApplicationRecord
  belongs_to :user
  has_many :entries, dependent: :destroy

  # Could put validates
  # validates :body, presence: true

  def generate_doc
    entries = self.entries
    report = self
    user = User.find(self.user_id)
    
    Caracal::Document.save 'example.docx' do |doc|
      doc.h1 'PORTLAND PROJECT 
      PORTLAND CENTER PLAZA
      THE LINC
      '
      doc.hr
      doc.h1 'SUNDAY, APRIL 12th , 2020'
      doc.page
      entries.each do |entry|
        doc.p entry.body
      end
      
      doc.h2 'Section 1'
      doc.p 'Lorem ipsum dolor....'
      doc.p
    end
    { report: report, entries: entries, user: user}
  end

end
